const CACHE_NAME = 'carboot-companion-v1';
const CACHE_URLS = ['/',
    'index.html',
    'normalize.css',
    'manifest.json',
    '/js/app.0dfd673a.js',
    '/js/lists.12bb4b91.js',
    '/js/edit.894f96b2.js',
    '/js/chunk-vendors.00092a4d.js',
    '/css/app.cf886a40.css',
    '/css/edit.a2071f03.css',
    '/css/lists.4c0dfc8c.css',
    'img/appImages/logo.png',
    'img/appImages/logo.webp',
    'img/appImages/logo_1x.png',
    'img/appImages/logo_1x.webp',
    'img/fonts/Raleway-Regular.eot',
    'img/fonts/Raleway-Regular.ttf',
    'img/fonts/Raleway-Regular.woff',
    'img/fonts/Raleway-Regular.woff2',
    'img/fonts/Roboto-Regular.eot',
    'img/fonts/Roboto-Regular.ttf',
    'img/fonts/Roboto-Regular.woff',
    'img/fonts/Roboto-Regular.woff2',
];


self.addEventListener("install", function (event) {
    //console.log("Service worker installed");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("caching assets");
            cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function (event) {
    //event.waitUntil(
    //    caches.keys().then(function (cacheNames) {
    //        return Promise.all(
    //            cacheNames.map(function (cacheName) {
    //                if (cacheName.startsWith('carboot-companion-') && CACHE_NAME !== cacheName) {
    //                    return caches.delete(cacheName);
    //                }
    //            })
    //        );
    //    })
    //);
});

// Intercept any network requests
self.addEventListener("fetch", function (event) {

    //console.log("Service worker intercepting fetch event: ", event);

    cacheThenNetwork(event);
});

const cacheThenNetwork = (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {

            if (response) {
                return response;
            }

            return fetch(event.request).then(function (response) {
                if (response.status === 404) {
                    return caches.match('fouro4.html');
                } else {
                    return response;
                }
            });
        }).catch(function (error) {
            return caches.match('offline.html');
        })
    );
};



//Ideal for anything static, i.e. appImages
const cacheOnly = (event) => {
    event.respondWith(caches.match(event.request));
};

//Ideal for things that have no offline equivalent, such as the map
const networkOnly = (event) => {
    event.respondWith(fetch(event.request));
};
//TODO: Insert offline default into Maps.js service