<template>
    <div class="nearby">
        <h1>Nearby Boot Sales</h1>

        <p v-if="errorStr">
            Unfortunately, an error occurred: {{errorStr}}
        </p>

        <p v-if="!mapLoaded">
            Loading...
        </p>

        <gMap id="map" v-if="this.location.coords.latitude && this.location.coords.longitude && !this.pending" @loaded="this.loaded" :latitude="location.coords.latitude" :longitude="location.coords.longitude" />
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
</style>

<script>
    import gMap from "@/components/Map.vue"

    export default {
        name: "NearbyBoots",
        data() {
            return {
                errorStr: ``,
                pending: false,
                mapLoaded: false,
                offline: false,
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
        mounted() {
            this.pending = true;
            this.update();
        },
        methods: {
            update: async function () {
                try {
                    this.location = await this.getLocation();
                } catch (e) {
                    this.pending = false;
                    this.errorStr = e.message;
                }
            },
            getLocation: async function () {
                return new Promise((resolve, reject) => {
                    if (!("geolocation" in navigator)) {
                        reject(new Error('Geolocation is not available.'));
                    }

                    navigator.geolocation.getCurrentPosition(pos => {
                        this.pending = false;
                        resolve(pos);
                    }, err => {
                        reject(err);
                    });
                });
            },
            loaded: function () {
                this.mapLoaded = true
            }
        }
    }
</script>