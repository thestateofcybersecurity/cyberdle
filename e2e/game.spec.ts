import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dailyIndex, localDateString, puzzleNumber } from '../src/game/daily';

// Compute today's answer the same way the app does, from the real dataset.
const dataPath = fileURLToPath(new URL('../src/data/acronyms.json', import.meta.url));
const data = JSON.parse(readFileSync(dataPath, 'utf8')) as Record<string, { expansion: string }>;
const keys = Object.keys(data).sort();
const todaysPuzzle = puzzleNumber(localDateString(new Date()));
const todaysAnswer = keys[dailyIndex(todaysPuzzle, keys.length)];

test('first visit shows help modal that actually closes', async ({ page }) => {
  await page.goto('/');
  // These assertions check real visibility, not just DOM attributes.
  const modal = page.locator('#modal-backdrop');
  await expect(modal).toBeVisible();
  await expect(page.locator('#modal-title')).toHaveText('How to play');
  await page.locator('#btn-close-modal').click();
  await expect(modal).toBeHidden();
  // Reopen and close via Escape.
  await page.locator('#btn-help').click();
  await expect(modal).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
});

test('daily puzzle can be won and shows the explanation', async ({ page }) => {
  await page.goto('/');
  const modal = page.locator('#modal-backdrop');
  if (await modal.isVisible()) {
    await page.locator('#btn-close-modal').click();
  }
  await page.keyboard.type(todaysAnswer, { delay: 40 });
  await page.keyboard.press('Enter');
  await expect(modal).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('#modal-title')).toHaveText('ACCESS GRANTED');
  await expect(page.locator('.result-expansion')).toHaveText(data[todaysAnswer].expansion);
  await expect(page.locator('.explanation')).not.toBeEmpty();
  await expect(page.locator('.sources-list a').first()).toBeVisible();
  await expect(page.locator('.soup-link')).toHaveAttribute(
    'href',
    `https://www.cybersecurityalphabetsoup.com/definitions/${todaysAnswer.toLowerCase()}.html`,
  );
});

test('glossary searches and expands entries', async ({ page }) => {
  await page.goto('/');
  const modal = page.locator('#modal-backdrop');
  if (await modal.isVisible()) {
    await page.locator('#btn-close-modal').click();
  }
  await page.locator('#tab-glossary').click();
  await expect(page.locator('#glossary-panel')).toBeVisible();
  await expect(page.locator('#game-board')).toBeHidden();
  await page.locator('#glossary-search').fill('SIEM');
  const entry = page.locator('.glossary-entry', { hasText: 'SIEM' }).first();
  await expect(entry).toBeVisible();
  await entry.locator('summary').click();
  await expect(entry.locator('.glossary-detail p')).not.toBeEmpty();
});

test('study mode reveals and grades a card', async ({ page }) => {
  await page.goto('/');
  const modal = page.locator('#modal-backdrop');
  if (await modal.isVisible()) {
    await page.locator('#btn-close-modal').click();
  }
  await page.locator('#tab-study').click();
  await expect(page.locator('#study-panel')).toBeVisible();
  await page.locator('.primary-btn', { hasText: 'Reveal' }).click();
  await expect(page.locator('.study-answer')).toBeVisible();
  await page.locator('.ghost-btn', { hasText: 'Knew it' }).click();
  await expect(page.locator('.study-progress')).toHaveText('1 reviewed this session');
});
