import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { allData } from '../src/data';
import { httpsUrl } from '../src/data/url';
import { validateData } from '../src/data/validate';
import type { AcronymData, AcronymEntry } from '../src/game/types';

// Security regressions and guards from the 2026-11-22 pentest.

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const repoRoot = fileURLToPath(new URL('..', import.meta.url));

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return entry.name.endsWith('.ts') ? [full] : [];
  });
}

describe('httpsUrl', () => {
  it('accepts plain https URLs unchanged', () => {
    for (const url of ['https://csrc.nist.gov/glossary/term/siem', 'https://owasp.org/www-project-top-ten/?x=1#y']) {
      expect(httpsUrl(url)).toBe(url);
    }
  });

  it('rejects every other scheme and shape', () => {
    const hostile: unknown[] = [
      'javascript:alert(1)',
      'JaVaScRiPt:alert(1)',
      ' javascript:alert(1)',
      'java\tscript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox(1)',
      'http://example.com/',
      '//example.com/',
      '/relative',
      'https://',
      'https://localhost/',
      'https://user:pass@example.com/',
      'https://example.com/ ',
      '',
      null,
      undefined,
      42,
      { href: 'https://example.com/' },
    ];
    for (const url of hostile) expect(httpsUrl(url), String(url)).toBeNull();
  });
});

describe('dataset validator rejects hostile entries', () => {
  const [sampleKey, sample] = Object.entries(allData())[0];
  const withEntry = (patch: Record<string, unknown>): AcronymData => ({
    ...allData(),
    [sampleKey]: { ...sample, ...patch } as unknown as AcronymEntry,
  });

  it('accepts the shipped dataset', () => {
    expect(validateData(allData())).toEqual([]);
  });

  it('rejects markup in any text field', () => {
    const payload = '<img src=x onerror=alert(1)>';
    for (const field of ['difficulty', 'category', 'display', 'expansion', 'explanation']) {
      const padded = field === 'explanation' ? payload.padEnd(120, ' x') : payload;
      expect(validateData(withEntry({ [field]: padded })).length, field).toBeGreaterThan(0);
    }
    expect(validateData(withEntry({ sources: [{ name: payload, url: 'https://example.com/' }] })).length).toBeGreaterThan(0);
  });

  it('rejects link schemes other than https', () => {
    for (const url of ['javascript:alert(1)', 'data:text/html,x', 'http://example.com/', 'https://u:p@example.com/']) {
      const errors = validateData(withEntry({ sources: [{ name: 'Source', url }] }));
      expect(errors.some((e) => e.includes('source url must be https')), url).toBe(true);
    }
  });

  it('reports non-text fields instead of throwing', () => {
    for (const patch of [{ difficulty: 5 }, { expansion: null }, { explanation: ['x'] }, { sources: [null] }, { sources: [{ name: 5, url: 5 }] }]) {
      expect(validateData(withEntry(patch)).length, JSON.stringify(patch)).toBeGreaterThan(0);
    }
    expect(validateData({ ...allData(), [sampleKey]: null as unknown as AcronymEntry }).length).toBeGreaterThan(0);
  });
});

describe('source guards', () => {
  it('never assigns dynamic content to innerHTML or other HTML-parsing sinks', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(srcDir)) {
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          const clearsOnly = /\.innerHTML\s*=\s*'';/.test(line);
          if (/\.(innerHTML|outerHTML)\s*\+?=/.test(line) && !clearsOnly) offenders.push(`${file}:${i + 1}`);
          if (/insertAdjacentHTML|document\.write|\beval\(|new Function\(/.test(line)) offenders.push(`${file}:${i + 1}`);
        });
    }
    expect(offenders).toEqual([]);
  });

  it('reads no input from the URL', () => {
    // The game has no URL parameters today. If one is added, it is a new
    // untrusted source and needs the same treatment as localStorage.
    const offenders = sourceFiles(srcDir).filter((file) =>
      /location\.(search|hash|href)|URLSearchParams|document\.referrer|window\.name/.test(readFileSync(file, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('loads no third-party scripts', () => {
    const html = readFileSync(join(repoRoot, 'index.html'), 'utf8');
    const scripts = [...html.matchAll(/<script\b[^>]*>/g)].map((m) => m[0]);
    expect(scripts).toEqual(['<script type="module" src="/src/main.ts">']);
  });
});
