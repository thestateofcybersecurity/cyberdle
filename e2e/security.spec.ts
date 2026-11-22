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

test.describe('Content Security Policy (hardening)', () => {
  async function recordViolations(page: Page): Promise<void> {
    await page.addInitScript(() => {
      const w = window as unknown as { __csp: string[] };
      w.__csp = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        w.__csp.push(`${event.violatedDirective} ${event.blockedURI}`);
      });
      localStorage.setItem('cyberdle:seen', '1');
    });
  }
  const violations = (page: Page) => page.evaluate(() => (window as unknown as { __csp: string[] }).__csp);

  test('the built page carries the policy and normal use raises no violations', async ({ page }) => {
    await recordViolations(page);
    await page.goto('/');
    const policy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
    expect(policy).toContain("script-src 'self'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).not.toContain('unsafe-inline');
    expect(policy).not.toContain('unsafe-eval');

    // Walk every view and modal so any inline style or script would surface.
    await page.keyboard.type('ZZZ');
    await page.keyboard.press('Enter');
    for (const button of ['#btn-help', '#btn-stats', '#btn-settings', '#btn-archive']) {
      await page.locator(button).click();
      await expect(page.locator('#modal-backdrop')).toBeVisible();
      await page.locator('#btn-close-modal').click();
    }
    await page.locator('#tab-practice').click();
    await expect(page.locator('#status-line')).toContainText('practice');
    await page.locator('#tab-study').click();
    await page.locator('.primary-btn', { hasText: 'Reveal' }).click();
    await page.locator('#tab-glossary').click();
    await page.locator('#glossary-search').fill('SIEM');
    await page.locator('.glossary-entry summary').first().click();
    await page.waitForLoadState('networkidle');
    expect(await violations(page)).toEqual([]);
  });

  test('injected inline script and event-handler markup do not run', async ({ page }) => {
    await recordViolations(page);
    await page.goto('/');
    // Stand-in for a future DOM XSS regression: attacker markup reaches innerHTML.
    await page.evaluate(() => {
      const host = document.createElement('div');
      host.innerHTML = '<img src="x" onerror="window.__pwned = 1">';
      document.body.appendChild(host);
      const script = document.createElement('script');
      script.textContent = 'window.__pwned = 2';
      document.body.appendChild(script);
    });
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
    expect((await violations(page)).length).toBeGreaterThan(0);
  });
});
