<template>
  <div class="my_bookings" v-if="bookings.length>=1">
    <div class="booking_card" v-for="(booking,index) in bookings" :key="index">
      <div class="for_shadow">
        <h3>{{booking.lot.name}}</h3>
        <div class="img_container">
          <img :src="'https://parkers-0.herokuapp.com/img/lots/'+booking.lot.coverImage" alt="photo" />
        </div>
        <div class="details_container">
          <div class="details_items">
            <strong>Arrival Time :</strong>
            <span>{{new Date(booking.entryTime).toLocaleString("hi-IN")}}</span>
          </div>
          <div class="details_items">
            <strong>Departure Time :</strong>
            <span>{{new Date(booking.exitTime).toLocaleString("hi-IN")}}</span>
          </div>
          <div class="details_items">
            <strong>Name :</strong>
            <span>{{booking.customerName}}</span>
          </div>
          <div class="details_items">
            <strong>Vehicle No. :</strong>
            <span>{{booking.vehicleNo}}</span>
          </div>
          <div class="details_items">
            <strong>Location :</strong>
            <span>{{booking.lot.district}}, {{booking.lot.state}}</span>
          </div>
          <br>
          <div style="text-align: right; padding-right: 10px">
              <router-link class="btn btn-success" :to="'/parking-lot?id='+booking.lot._id">View Lot</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>No Bookings Yet!!!</h1>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      bookings: []
    };
  },
  async created() {
    try {
      const res = await Axios.get(
        `${process.env.HOST_URL}api/v1/bookings/getMyBookings`,
        { withCredentials: true }
      );
      this.bookings = res.data.data;
      console.log(this.bookings);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
.my_bookings {
  display: flex;
  flex-wrap: wrap;
}
.booking_card {
  flex-basis: 33.33%;
  /* box-shadow: 2px 2px 5px black; */
  margin: 30px 0px;
}
.img_container {
  height: 200px;
  overflow: hidden;
  margin: auto;
  background-color: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
img {
  margin-top: -150px;
  opacity: 0.8;
}
.details_items {
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
}
.for_shadow {
  width: 350px;
  box-shadow: 2px 2px 10px black;
  margin: auto;
  border-radius: 5px;
  padding-bottom: 10px;
  position: relative;
}
@media screen and (max-width: 1100px) {
  div.booking_card {
    flex-basis: 50%;
  }
}
h3{
    position: absolute;
    top: 150px;
    right: 0px;
    z-index: 100;
    display: inline-block;
    background-color: rgb(209, 207, 207);
    padding: 5px;
    border-radius: 3px;
}
@media screen and (max-width: 750px) {
  div.booking_card {
    flex-basis: 100%;
  }
  .for_shadow {
    width: 250px;
    font-size: 12px;
  }
  .img_container {
    height: 150px;
  }
  h3{
      font-size: 18px;
      top: 110px;
  }
  a{
      font-size: 12px;
  }
}
</style>