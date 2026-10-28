// Service worker untuk Lompat Hewan Tak Terbatas
// Ganti VERSI setiap kali isi game diperbarui, misalnya lompat-v2
const VERSI = 'lompat-v2';
const BERKAS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(BERKAS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(daftar =>
      Promise.all(daftar.filter(k => k !== VERSI).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
