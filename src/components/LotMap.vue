<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  props: ["lot"],
  mounted() {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/guptswayam/ck8f87qyl18z21invez6nssds",
      style: "mapbox://styles/mapbox/streets-v11",
      scrollZoom: false,
      center: this.lot.location.coordinates,
      zoom: 11.15
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    new mapboxgl.Marker({
      anchor: "bottom"
    })
      .setLngLat(this.lot.location.coordinates)
      .addTo(this.map);
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    new mapboxgl.Popup({
      offset: 50
    })
      .setLngLat(this.lot.location.coordinates)
      .setHTML(`${this.lot.name}, ${this.lot.district}`)
      .addTo(this.map);
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 95vh;
}
@media screen and (max-width: 768px){
  #map{
    width: 100%;
    height: 75vh;
  }
}
</style>