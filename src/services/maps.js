//import axios from "axios";

const API_KEY = 'AIzaSyCWqSLV8cRYJZRVWKf95euMstiLcfmF4f4';
const CALLBACK_NAME = 'mapCallback';

let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;
// This promise handles the initialization
// status of the google maps script.
const initPromise = new Promise((resolve, reject) => {
    resolveInitPromise = resolve;
    rejectInitPromise = reject;
});



export default
    {
        init() {
            // If Google Maps already is initialized
            // the `initPromise` should get resolved
            // eventually.
            if (initialized) return initPromise;

            initialized = true;
            // The callback function is called by
            // the Google Maps script if it is
            // successfully loaded.
            window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

            // We inject a new script tag into
            // the `<head>` of our HTML to load
            // the Google Maps script.
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
            script.onerror = rejectInitPromise;
            document.querySelector('head').appendChild(script);

            return initPromise;
        },
        async findNearby(latitude, longitude) {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=carboot&key=${API_KEY}`;
            let proxy = `https://cors-anywhere.herokuapp.com/`;

            ////circumventing CORS error https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
            //await fetch(proxy + url)
            //    .then(response => response.json())
            //    .then(contents => {
            //        return contents.results;
            //    })
            //    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

            const response = await fetch(proxy + url);
            const json = await response.json();
            return json;
        }
    }