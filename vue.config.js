module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/_variables.scss";`
            }
        }
    },
    pwa: {
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        },
        name: "Carboot Companion",
        appleMobileWebAppCapable: true,
        themeColor: "#ffd782",
        msTileColor: "#ffd782",
        manifestOptions: {
            background_color: "#ffffff"
        }
    }
};