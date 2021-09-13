self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('fox-store').then((cache) => cache.addAll([
        
        './index.html',
        './watch.js',
        './css.css',
        './icon.png',
        './Mickey Watch.jpg',
        './audio.wav',
        './favicon.ico',
        "./apple-icon-57x57.png",
        "./apple-icon-60x60.png",
        "./apple-icon-72x72.png",
        "./apple-icon-76x76.png",
        "./apple-icon-114x114.png",
        "./apple-icon-120x120.png",
        "./apple-icon-144x144.png",
        "./apple-icon-152x152.png",
        "./apple-icon-180x180.png",
        "./android-icon-192x192.png",
        "./favicon-32x32.png",
        "./favicon-96x96.png"      

     ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });