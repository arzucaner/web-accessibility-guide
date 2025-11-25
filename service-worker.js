// Service Worker for Web Accessibility Guide
const CACHE_NAME = 'a11y-guide-v1';

// Get base path from service worker location (handles GitHub Pages subdirectories)
const getBasePath = () => {
  const swPath = self.location.pathname;
  const swDir = swPath.substring(0, swPath.lastIndexOf('/') + 1);
  return swDir === '/' ? '' : swDir;
};

const BASE_PATH = getBasePath();
const OFFLINE_URL = `${BASE_PATH}offline.html`;

// Assets to precache
const PRECACHE_ASSETS = [
  `${BASE_PATH}index.html`,
  `${BASE_PATH}styles.css`,
  `${BASE_PATH}script.js`,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}images/accessibility_guide.png`,
  `${BASE_PATH}lang/de.json`,
  `${BASE_PATH}lang/en.json`,
  `${BASE_PATH}lang/es.json`,
  `${BASE_PATH}lang/fr.json`,
  `${BASE_PATH}lang/ja.json`,
  `${BASE_PATH}lang/tr.json`,
  `${BASE_PATH}wcag/map.json`,
  `${BASE_PATH}icons/icon-192x192.png`,
  `${BASE_PATH}icons/icon-512x512.png`,
  OFFLINE_URL
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })))
          .catch((err) => {
            console.warn('Failed to precache some assets:', err);
            // Continue even if some assets fail to cache
            return Promise.resolve();
          });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  const acceptHeader = request.headers.get('accept') || '';

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // HTML: network-first with offline fallback
  if (request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Fallback to offline page for navigation requests
              if (request.mode === 'navigate') {
                return caches.match(OFFLINE_URL);
              }
              return new Response('Offline', { status: 503 });
            });
        })
    );
    return;
  }

  // CSS, JS, Images, JSON: cache-first with update in background
  if (
    request.url.endsWith('.css') ||
    request.url.endsWith('.js') ||
    request.url.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i) ||
    request.url.endsWith('.json')
  ) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Update cache in background
            fetch(request).then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, response.clone());
                });
              }
            }).catch(() => {
              // Ignore fetch errors for background updates
            });
            return cachedResponse;
          }
          // Not in cache, fetch and cache
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return response;
            })
            .catch(() => {
              return new Response('Offline', { status: 503 });
            });
        })
    );
    return;
  }

  // For other requests, try network first
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Listen for skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

