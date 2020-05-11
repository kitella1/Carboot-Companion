<template>
    <div class="nearby">
        <h1>Nearby Boot Sales</h1>
        <button @click="this.search">shalom</button>

        <p v-if="errorStr">
            Unfortunately, an error occurred: {{errorStr}}
        </p>

        <p v-if="loading">
            Loading...
        </p>

        <div v-if="!online" class="offlineMap" />
        <gMap id="map" v-if="this.location.coords.latitude && this.location.coords.longitude" @loaded="this.loaded" :latitude="location.coords.latitude" :longitude="location.coords.longitude" />
    </div>
</template>

<style lang="scss" scoped>
    .nearby {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0em 2em;
        width: 90vw;
    }

    button {
        background: $primaryDark;
        border-radius: 5px;
        border: none;
        box-shadow: 5px 5px 5px -9px rgba(0,0,0,0.75);
        text-transform: uppercase;
        color: white;
        padding: 0;
        letter-spacing: 1.5px;
        font-size: 0.9em;
        padding: 0.8em;
    }

    #map {
        margin-top: 1em;
    }
    .offlineMap {
        width: 100%;
        height: 70vh;
        background-size: cover;
        background-position: center;
        max-width: 642px;
        background-image: url('/img/appImages/fallback.png');
    }
</style>

<script>
    import gMap from "@/components/Map.vue"

    export default {
        name: "NearbyBoots",
        data() {
            return {
                errorStr: ``,
                online: navigator.onLine,
                loading: false,
                location: {
                    coords: {
                        latitude: 0,
                        longitude: 0
                    }
                }
            }
        },
        components: {
            gMap
        },
        methods: {
            search: async function () {
                try {
                    this.loading = true;
                    this.location = await this.getLocation();
                }
                catch (e) {
                    this.loading = false;
                    this.errorStr = e.message;
                }
            },
            getLocation: async function () {
                return new Promise((resolve, reject) => {
                    if (!("geolocation" in navigator)) {
                        reject(new Error('Geolocation is not available.'));
                    }

                    navigator.geolocation.getCurrentPosition(pos => {
                        resolve(pos);
                    }, err => {
                        reject(err);
                    });
                });
            },
            loaded: function () {
                this.loading = false;
            }
        }
    }
</script>