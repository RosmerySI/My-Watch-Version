let mickeySong = document.getElementById("mickeySong");
function Song(){
   mickeySong.play();
  
  
}

(function() {

  function x2(n, i, x1, r) {
      return x1 + r * Math.sin(2 * Math.PI * n / i);
  }

  function y2(n, i, y1, r) {
      return y1 - r * Math.cos(2 * Math.PI * n / i);
  }

  function getTime() {
      var date = new Date();
      return {
          hours: date.getHours(),
          minutes: (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes(),
          seconds: (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()
      };
  }

  function drawCircle(ctx, x, y, r, width, strokeColor, background) {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = background;
      ctx.lineWidth = width;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
  }

  function drawLine(ctx, xStart, yStart, xStop, yStop, width, color) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xStop, yStop);
      ctx.stroke();
      ctx.closePath();
  }

 

  function startClock(ctx) {
      var time = getTime();

      ctx.clearRect(0, 0, 500, 500); 


      drawLine(ctx, 205, 220, x2(time.hours, 12, 205, 75), y2(time.hours, 12, 220, 75), 4, "#040308"); 
      drawCircle(ctx, 205, 220, 7, 7, "black", "black");
      drawCircle(ctx, x2(time.hours, 12, 205, 75), y2(time.hours, 12, 220, 75), 7, 7, "white", "white");

     

      drawLine(ctx, 205, 220, x2(time.minutes, 60, 205, 95), y2(time.minutes, 60, 220, 95), 4, "#040308"); 
      drawCircle(ctx, x2(time.minutes, 60, 205, 95), y2(time.minutes, 60, 220, 95), 7, 7, "white", "white");
      

      drawLine(ctx, 205, 220, x2(time.seconds, 60, 205, 115), y2(time.seconds, 60, 220, 115), 4, "red"); 
      drawCircle(ctx, 205, 220, 3, 5, "#525252", "#525252");
      

  
  }

  var canvas = document.getElementById("watch-clock"),
      ctx;

  if (canvas.getContext) {
      ctx = canvas.getContext("2d");

      startClock(ctx);

      setInterval(function() {
          startClock(ctx);
      }, 1000);
  } else {
      document.getElementsByTagName("body")[0].innerHTML += "<h2>Canvas not supported.</h2>";
  }

})();

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
  });

  // Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
  
  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
  }

  import { ConnectedRouter, push } from 'react-router-redux';

class PersistedConnectedRouter extends ConnectedRouter {
  componentWillMount() {
    const { store: propsStore, history, isSSR } = this.props;
    this.store = propsStore || this.context.store;

    if (!isSSR) {
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    }

    //this is the tweak which will prefer persisted route instead of that in url:
    const location = this.store.getState().router.location || {};
    if (location.pathname !== history.location.pathname) {
      this.store.dispatch(push(location.pathname));
    }
    this.handleLocationChange(history.location);
    // --
  }
}

export default PersistedConnectedRouter;


// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
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
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

componentDidMount() {
    window.addEventListener('online', () => this.setOnlineStatus(true));
    window.addEventListener('offline', () => this.setOnlineStatus(false));
  }

  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  setOnlineStatus = isOnline => this.setState({ online: isOnline })