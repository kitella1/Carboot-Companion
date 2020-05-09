<template>
    <div id="map" />
</template>
<style lang="scss" scoped>
    #map {
        width: 90vw;
        height: 70vh;
    }
</style>

<script>
    import mapInit from '@/services/maps';

    export default {
        name: "Map",
        props: ["latitude", "longitude"],
        data() {
            return {
                bootSales: []
            }
        },
        created() {
            this.setUp()
        },
        methods: {
            setUp: async function () {
                try {
                    const google = await mapInit.init();
                    const locations = await mapInit.findNearby(this.latitude, this.longitude);
                    const geocoder = new google.maps.Geocoder();
                    const map = new google.maps.Map(this.$el);
                    this.bootSales = locations.results;

                    geocoder.geocode({
                        'location': new google.maps.LatLng(this.latitude, this.longitude)
                    },
                        (results, status) => {
                            if (status !== 'OK' || !results[0]) {
                                throw new Error(status);
                            }
                            map.setCenter(results[0].geometry.location);
                            map.fitBounds(results[0].geometry.viewport);

                            if (this.bootSales) {
                                for (let i = 0; i < this.bootSales.length; i++) {
                                    new google.maps.Marker({
                                        position: new google.maps.LatLng(this.bootSales[i].geometry.location.lat, this.bootSales[i].geometry.location.lng),
                                        map: map
                                    });
                                }
                                this.$emit('mapLoaded');
                            }
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>