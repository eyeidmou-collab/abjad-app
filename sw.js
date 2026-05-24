// ================================================
// SERVICE WORKER — Calculateur Abjad PWA
// Stratégie : Cache First + mise à jour en arrière-plan
// ================================================

const CACHE_NAME = 'abjad-v1.0.0';

// Fichiers à mettre en cache au premier chargement
const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
];

// ─── INSTALL : mise en cache initiale ───────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Mise en cache des ressources');
      // On ignore les erreurs d'icônes manquantes
      return Promise.allSettled(
        PRECACHE_URLS.map(url => cache.add(url).catch(e => console.warn('[SW] Impossible de cacher :', url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE : suppression des anciens caches ──
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Suppression ancien cache :', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ─── FETCH : Cache First, puis réseau ───────────
self.addEventListener('fetch', (event) => {
  // On ignore les requêtes non-GET et chrome-extension
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      // Trouvé en cache → retourner immédiatement
      if (cachedResponse) {
        // Mise à jour silencieuse en arrière-plan
        fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {}); // silencieux si hors ligne

        return cachedResponse;
      }

      // Pas en cache → aller chercher sur le réseau
      return fetch(event.request)
        .then(networkResponse => {
          // Mettre en cache la nouvelle ressource
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline + pas en cache : page de secours
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

// ─── MESSAGE : forcer la mise à jour ────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
