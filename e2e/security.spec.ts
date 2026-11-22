import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { localDateString, puzzleNumber } from '../src/game/daily';

// Security regressions from the 2026-11-22 pentest.

const todaysPuzzle = puzzleNumber(localDateString(new Date()));

async function loadWithStorage(page: Page, storage: Record<string, string>): Promise<string[]> {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
  }, storage);
  await page.goto('/');
  return errors;
}

test.describe('CYB-01: poisoned localStorage cannot break the app', () => {
  // The service worker is irrelevant here and only slows the reloads down.
  test.use({ serviceWorkers: 'block' });

  for (const guesses of [5, [1337], 'SIEM', null, [null, { length: 4 }, ['A']]]) {
    test(`daily progress with guesses = ${JSON.stringify(guesses)} still boots`, async ({ page }) => {
      const errors = await loadWithStorage(page, {
        'cyberdle:seen': '1',
        'cyberdle:daily': JSON.stringify({ puzzleNum: todaysPuzzle, guesses, status: 'playing' }),
      });
      await expect(page.locator('#game-board .tile').first()).toBeVisible();
      await expect(page.locator('#status-line')).toContainText(`puzzle #${todaysPuzzle}`);
      await page.reload();
      await expect(page.locator('#game-board .tile').first()).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('a malformed learning store does not break glossary, study, or practice', async ({ page }) => {
    const errors = await loadWithStorage(page, {
      'cyberdle:seen': '1',
      'cyberdle:learning': JSON.stringify({ SIEM: null, XDR: 'x', VPN: { right: 'a', wrong: {} } }),
    });
    await page.locator('#tab-glossary').click();
    await expect(page.locator('#glossary-list .glossary-entry').first()).toBeVisible();
    await page.locator('#tab-study').click();
    await expect(page.locator('#study-card .study-expansion')).toBeVisible();
    await page.locator('#tab-practice').click();
    await page.locator('#filter-category').selectOption('__missed');
    await expect(page.locator('#game-board .tile').first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('malformed stats, results, and settings still render', async ({ page }) => {
    const errors = await loadWithStorage(page, {
      'cyberdle:seen': '1',
      'cyberdle:stats': JSON.stringify({ played: 3, won: 3, distribution: 'x', lastPlayedPuzzle: {} }),
      'cyberdle:results': JSON.stringify({ '1': '<img src=x onerror=alert(1)>', '2': { a: 1 }, x: 1 }),
      'cyberdle:settings': JSON.stringify({ hardMode: '<b>', theme: 7, colorblind: [] }),
    });
    await page.locator('#btn-stats').click();
    await expect(page.locator('#modal-body .dist-row')).toHaveCount(6);
    await page.locator('#btn-close-modal').click();
    await page.locator('#btn-archive').click();
    await expect(page.locator('#modal-body .archive-row').first()).toBeVisible();
    await expect(page.locator('#modal-body .archive-result')).toHaveCount(0);
    await page.locator('#btn-close-modal').click();
    await page.locator('#btn-settings').click();
    await expect(page.locator('#modal-body .toggle')).toHaveCount(3);
    expect(errors).toEqual([]);
  });
});

test.describe('CYB-02: service worker cache cannot be grown from a URL', () => {
  async function waitForController(page: Page): Promise<void> {
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise((resolve) =>
          navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }),
        );
      }
    });
  }

  async function cacheKeys(page: Page): Promise<string[]> {
    return page.evaluate(async () => {
      const urls: string[] = [];
      for (const name of await caches.keys()) {
        const cache = await caches.open(name);
        for (const request of await cache.keys()) urls.push(request.url);
      }
      return urls;
    });
  }

  test('query strings never create cache entries, and offline still works', async ({ page, context }) => {
    await page.goto('/');
    await waitForController(page);
    await page.reload();
    await page.waitForLoadState('networkidle');
    const before = await cacheKeys(page);
    const bundle = before.find((url) => /\/assets\/index-[\w-]+\.js$/.test(url));
    expect(bundle, 'the hashed bundle is cached once').toBeTruthy();

    // What a hostile page would do: cache-busted navigations to the shell and the bundle.
    for (let i = 0; i < 6; i++) {
      await page.goto(`/?pwn=${i}`);
      await page.goto(`${bundle}?pwn=${i}`);
    }
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const after = await cacheKeys(page);
    expect(after.filter((url) => url.includes('?'))).toEqual([]);
    expect(after.length).toBe(before.length);

    // The fix must not cost the offline support the worker exists for.
    await context.setOffline(true);
    await page.goto('/?offline=1');
    await expect(page.locator('#game-board .tile').first()).toBeVisible();
    await context.setOffline(false);
  });
});
