if (workbox) {
    console.log(`Yay! Workbox is loaded`);
    workbox.setConfig({
        debug: false,
    });
    workbox.precaching.precacheAndRoute([
        {
            url: '/img/appImages/fallback.png',
            revision: 'e0f8c4b2cf490147284ab35072d7ce25'
        },
        {
            url: '/img/icons/favicon-32x32.png'
        },
        {
            url: '/img/icons/favicon-16x16.png'
        }
    ]);
    workbox.routing.registerNavigationRoute('/index.html');

    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );


    //Maps
    workbox.routing.registerRoute(
        ({ url }) => url.origin === 'https://cors-anywhere.herokuapp.com/',
        workbox.strategies.networkOnly()
    );

} else {
    console.log(`Boo! Workbox didn't load`);
}