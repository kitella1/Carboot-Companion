<template>
    <div id="app">
        <picture id="logo">
            <source media="(min-width: 800px)" srcset="img/appImages/logo_1x.webp 1x, img/appImages/logo.webp 2x" type="image/webp">
            <source media="(min-width: 600px)" srcset="img/appImages/logo_1x.webp 1x, img/appImages/logo.webp 2x" type="image/webp">
            <source media="(min-width: 450px)" srcset="img/appImages/logo_1x.webp 1x, img/appImages/logo.webp 2x" type="image/webp">
            <source media="(min-width: 1px)" srcset="img/appImages/logo_1x.webp 1x,img/appImages/logo.webp 2x" type="image/webp">
            <source media="(min-width: 800px)" srcset="img/appImages/logo_1x.png 1x, img/appImages/logo.png 2x">
            <source media="(min-width: 600px)" srcset="img/appImages/logo_1x.png 1x, img/appImages/logo.png 2x">
            <source media="(min-width: 450px)" srcset="img/appImages/logo_1x.png 1x, img/appImages/logo.png 2x">
            <img src="img/appimages/logo.png" alt="Carboot companion logo" srcset="img/appimages/logo_1x.png 1x,img/appimages/logo.png 2x" id="subImg">
        </picture>
        <router-view id="view" />
        <div id="nav">
            <router-link to="/edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="feather feather-plus" style="fill:none;stroke-linejoin:round;stroke-width:2;stroke:currentColor">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <p>Add</p>
            </router-link>
            <router-link to="/lists">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="feather feather-list" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;stroke:currentColor">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3" y2="6" />
                    <line x1="3" y1="12" x2="3" y2="12" />
                    <line x1="3" y1="18" x2="3" y2="18" />
                </svg>
                <p>Lists</p>
            </router-link>
            <router-link to="/find">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="feather feather-map-pin" style="fill:none;stroke-linejoin:round;stroke-width:2;stroke:currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                <p>Find</p>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
    @font-face {
        font-family: 'Roboto';
        src: url('/img/fonts/Roboto-Regular.woff2') format('woff2'), url('/img/fonts/Roboto-Regular.woff') format('woff'), url('/img/fonts/Roboto-Regular.ttf') format('truetype'), url('/img/fonts/Roboto-Regular.eot') format('embedded-opentype');
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
    }

    @font-face {
        font-family: 'Raleway';
        src: url('/img/fonts/Raleway-Regular.woff2') format('woff2'), url('/img/fonts/Raleway-Regular.woff') format('woff'), url('/img/fonts/Raleway-Regular.ttf') format('truetype'), url('/img/fonts/Raleway-Regular.eot') format('embedded-opentype');
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
    }

    #app {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-width: 240px;
        max-width: 1000px;
        color: $font;
        padding-top: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #view {
        padding-bottom: 4em;
    }

    @media only screen and (min-width: 200px) {

        h1, h2, h3 {
            font-family: 'Raleway','Roboto', Helvetica, Arial, sans-serif;
            margin: 0.5em 0;
        }

        h1 {
            font-size: 1.8em;
            text-align: center;
        }

        h3 {
            margin: 1em 0;
        }

        #logo {
            width: 20%;
            & * {
                    width: 100%;
                    height: auto;
                }
        }

    #nav {
        background: $secondary;
        width: 100%;
        display: flex;
        justify-content: space-around;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 57px;
        z-index: 100;
        & a
            {
                color: white;
                opacity: 0.4;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &.router-link-exact-active
                {
                    opacity: 1;
                }
                & p {
                    margin: 0;
                    letter-spacing: 1px;
                    font-size: 0.8em;
                }
                & svg {
                    padding-bottom: 2px;
                }
            }
        }
    }
</style>

<script>
    export default {
        mounted() {
            if (!('indexedDB' in window)) {
                console.log('This browser doesn\'t support IndexedDB');
                return;
            }
        }
    }
</script>
