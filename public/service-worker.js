if (workbox) {
    console.log(`Yay! Workbox is loaded`);
    workbox.setConfig({
        debug: false,
    });
    workbox.precaching.precacheAndRoute([]);
    workbox.routing.registerNavigationRoute('/index.html');
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        })
    );
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );

} else {
    console.log(`Boo! Workbox didn't load`);
}