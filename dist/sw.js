/* Copyright © Imesh Chamara 2019 */

const _caches_main = 'ic-c-v1';
const _caches_ = {
  vendor: {
    name: _caches_main + '-vendor-v1',
    data: [ '/vendor.bundle.js' ]
  },
  app: {
    name: _caches_main + '-app-v1',
    data: [ '/p201907221623.bundle.js', '/style/p201907221623.css' ]
  },
  runtime: {
    name: _caches_main + '-r-v1',
    data: [ '/' ]
  }
};

self.addEventListener('install', e => Object.keys(_caches_).forEach(a => e.waitUntil(caches.open(_caches_[a].name).then(v => _caches_[a].data.forEach(b => fetch(new Request(new URL(self.location.origin + b + '?t=' + Date.now()))).then(a => v.put(b, a)))))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(v => Promise.all(v.map(v => { if(!v.startsWith(_caches_main)) return caches.delete(v) })))));

self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(caches.match(e.request).then(v => {
    if (v) return v;
    return caches.open(_caches_.runtime.name)
      .then(v => fetch(e.request)
        .then(r => v.put(e.request, r.clone())
          .then(() => r)));
  }))
});
