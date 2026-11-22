/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

/**
 * GitHub Pages cannot send response headers, so the Content Security Policy
 * ships as a meta tag in the built index.html. Build only: the dev server
 * needs inline scripts and a websocket for hot reload.
 *
 * Everything is same-origin except Google Fonts (stylesheet and font files).
 * A meta policy cannot carry frame-ancestors or report-uri; those still need a
 * real header from the CDN in front of Pages.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  'font-src https://fonts.gstatic.com',
  "img-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

function contentSecurityPolicy(): Plugin {
  return {
    name: 'cyberdle-csp-meta',
    apply: 'build',
    transformIndexHtml: () => [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
        injectTo: 'head-prepend',
      },
    ],
  };
}

export default defineConfig({
  // Relative base so the build works at any GitHub Pages path.
  base: './',
  plugins: [contentSecurityPolicy()],
  build: {
    target: 'es2022',
  },
  test: {
    // Playwright specs live in e2e/ and must not run under Vitest.
    include: ['tests/**/*.test.ts'],
  },
});
