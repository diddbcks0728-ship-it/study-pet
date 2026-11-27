const C='study-pet-v1';
const FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// 인터넷이 되면 새 파일, 안 되면 저장해 둔 파일
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));}return r;}).catch(()=>caches.match(e.request)));});
