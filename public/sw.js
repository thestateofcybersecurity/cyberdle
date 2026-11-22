// Cyberdle service worker: best-effort offline support.
//
// The cache is keyed by a small, fixed set of URLs so nothing a third party can
// put in a link (query strings, cache-busting parameters) creates new entries:
//   - the app shell, stored once under the scope URL whatever the query string;
//   - a short allowlist of static files (icons, manifest), keyed by path;
//   - content-hashed build assets, keyed by path and capped in number.
// Everything else goes straight to the network and is never stored.
const CACHE = 'cyberdle-v2';
const SCOPE = new URL('./', self.location.href);
const SHELL_KEY = SCOPE.href;
const SHELL_PATHS = new Set([SCOPE.pathname, new URL('index.html', SCOPE).pathname]);
const STATIC_PATHS = new Set(
  ['icon.svg', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest'].map(
    (file) => new URL(file, SCOPE).pathname,
  ),
);
const ASSET_PREFIX = new URL('assets/', SCOPE).pathname;
// A handful of deploys' worth of hashed files; older ones are evicted first.
const MAX_ASSETS = 24;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(SHELL_KEY))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  // Deleting every other cache also clears anything an older worker stored
  // under attacker-chosen query strings.
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

/** Only plain, successful, same-origin responses are worth keeping. */
function cacheable(response) {
  return response.ok && response.type === 'basic' && !response.redirected;
}

async function pruneAssets(cache) {
  const keys = (await cache.keys()).filter((request) =>
    new URL(request.url).pathname.startsWith(ASSET_PREFIX),
  );
  // cache.keys() is in insertion order, so the oldest entries come first.
  await Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_ASSETS)).map((k) => cache.delete(k)));
}

/** Content-hashed files: cache-first, keyed by path so a query string changes nothing. */
async function assetResponse(request, key) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(key);
  if (hit) return hit;
  const response = await fetch(request);
  if (cacheable(response)) {
    await cache.put(key, response.clone());
    await pruneAssets(cache);
  }
  return response;
}

/** Network-first; a good response refreshes the single entry stored under `key`. */
async function networkFirst(request, key, fallbackKey) {
  try {
    const response = await fetch(request);
    if (key && cacheable(response)) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(key, copy));
    }
    return response;
  } catch (error) {
    const hit = await caches.match(fallbackKey ?? key);
    if (hit) return hit;
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // The cache key never includes the query string or fragment.
  const key = url.origin + url.pathname;

  if (url.pathname.startsWith(ASSET_PREFIX)) {
    event.respondWith(assetResponse(request, key));
  } else if (request.mode === 'navigate') {
    // Only the real app shell is stored; any navigation falls back to it offline.
    event.respondWith(networkFirst(request, SHELL_PATHS.has(url.pathname) ? SHELL_KEY : null, SHELL_KEY));
  } else if (STATIC_PATHS.has(url.pathname)) {
    event.respondWith(networkFirst(request, key));
  }
  // Anything else is left to the browser: fetched normally, never cached.
});
