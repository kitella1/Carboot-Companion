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
        mounted() {
            this.setUp()
        },
        methods: {
            setUp: async function () {
                try {
                    const google = await mapInit.init();
                    const geocoder = new google.maps.Geocoder();

                    const locations = await mapInit.findNearby(this.latitude, this.longitude);
                    this.bootSales = locations.results;

                    const map = new google.maps.Map(this.$el);
                    let bounds = new google.maps.LatLngBounds();

                    let markers = [];


                    console.log(this.latitude + " " + this.longitude)
                    geocoder.geocode({
                        'location': new google.maps.LatLng(this.latitude, this.longitude)
                    },(results, status) => {
                            if (status !== 'OK' || !results[0]) {
                                console.log("An error occurred.");
                                console.log(status);
                                //TODO: Catch offline error message or display default map
                            }

                            if (this.bootSales) {
                                for (let i = 0; i < this.bootSales.length; i++) {
                                    let m = new google.maps.Marker({
                                        position: new google.maps.LatLng(this.bootSales[i].geometry.location.lat, this.bootSales[i].geometry.location.lng),
                                        map: map
                                    });
                                    //ensures zoom of map covers all markers
                                    markers.push(m.position);
                                    let str =
                                        '<div id="content">' +
                                        '<h3 id="firstHeading" class="firstHeading">' + this.bootSales[i].name + '</h3>' +
                                        '<div id="bodyContent">' +
                                        '<p>' + this.bootSales[i].vicinity + '</p>' +
                                        '</div>' +
                                        '</div>';
                                    bounds.extend(markers[i]);

                                    m.addListener('click', function () {
                                        new google.maps.InfoWindow({
                                            content: str
                                        }).open(map, m);
                                    });
                                }
                                this.$emit('loaded');
                            }

                            map.setCenter(results[0].geometry.location);
                            map.fitBounds(bounds);
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>