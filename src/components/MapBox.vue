<template>
  <div id="map" @click="viewDetails"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
export default {
  data() {
    return {
      lots:{}
    };
  },
  async mounted() {
    try{
      const res=await axios.get(`${process.env.HOST_URL}api/v1/parking-lots`);
      this.lots=res.data;
    } catch(err){
      console.log(err);
    }
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    this.map = new mapboxgl.Map({
      container: "map",
      // style: "mapbox://styles/guptswayam/ck8f87qyl18z21invez6nssds",
      style: "mapbox://styles/mapbox/streets-v11",
      scrollZoom: false,
      center: [77.1697, 28.5977],
      zoom: 10.15
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    this.lots.data.forEach(el => {
      new mapboxgl.Popup({
        offset: 10
      })
        .setLngLat(el.location.coordinates)
        .setHTML(`${el.name}, ${el.district}`)
        .addTo(this.map);
    });
    this.map.on("load", () => {
      this.map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.lots.data.map(el=>{
            return {
              type: "Feature",
              properties: {
                description: `<h5 style="color:green">${el.name}</h5><strong>${el.district}, ${el.state}</strong><br><hr><div style="display: flex;justify-content: space-between;font-size:14px"><span><svg style="width:30px;height:25px;fill:green;margin-top:-5px;"><use href="/src/assets/icons.svg#star"/></svg>${el.ratingsAverage}</span><span style="margin-left:10px"> Rs.${el.price} per hour</span></div><br><button class="details btn btn-success" style="float:right; padding: 3px 10px" data-id="${el._id}">Details</button>`,
                icon: "car"
              },
              geometry: {
                type: "Point",
                coordinates: el.location.coordinates
              }
            }
          })
        }
      });
      // Add a layer showing the places.
      this.map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
          "icon-size": 1.5
        }
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      this.map.on("click", "places", e => {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      this.map.on("mouseenter", "places", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      this.map.on("mouseleave", "places", () => {
        this.map.getCanvas().style.cursor = "";
      });
    });
  },
  methods:{
    viewDetails(e){
      if(e.target.classList[0]=="details")
        this.$router.push({name : "parking-lot", query: {id : e.target.dataset.id}});
    }
  }
};
</script>

<style scoped>
.mapboxgl-popup {
  min-width: 300px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
#map {
  width: 100%;
  height: 90vh
}

</style>