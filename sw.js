/* Offline support and updates for the Wall Display.
   Each build keeps its own copy of the app files, and the page loads from that copy first,
   so the display opens with no internet.
   A new version ("prompt" mode): the browser downloads it in the background and keeps it waiting.
   It takes over only when the user taps Update (the page sends SKIP_WAITING), or when the user
   closes every window of the app and opens it again.
   Never call skipWaiting() on install: that would swap the version in the middle of the user's work.
   Weather and other data requests are not kept here; the page handles those.
   stamp.py sets BUILD before each release. */
const BUILD='20261125-201519';
const CACHE='wd-'+BUILD;
const FILES=['./','./index.html','./release-notes.js','./whatsnew.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

self.addEventListener('install',e=>{
  // cache:'reload' skips the browser's own cache, because GitHub Pages lets it keep files for 10 minutes
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));
});

self.addEventListener('message',e=>{
  if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;   // weather APIs go straight to the network
  e.respondWith(
    caches.open(CACHE)
      .then(c=>c.match(e.request,{ignoreSearch:true})
        .then(r=>r||(e.request.mode==='navigate'?c.match('./index.html'):null)))
      .then(r=>r||fetch(e.request))
      .catch(()=>caches.match('./index.html'))
  );
});
