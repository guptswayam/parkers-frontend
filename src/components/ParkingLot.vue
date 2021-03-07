<template>
  <div style="overflow:hidden;background-color:lightgray">
    <div v-if="lot.name">
      <div
        class="header"
        :style="'background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 00%, rgba(0, 0, 0, 0.65) 100%), url(https://parkers-0.herokuapp.com/img/lots/'+lot.coverImage+')'"
      >
        <h1>{{lot.name}}</h1>
        <div class="header_details">
          <span>
              <svg class="location_icon">
              <use href="src/assets/icons.svg#location" />
            </svg>
            </span><span style="margin-left: -10px">{{lot.district}}, {{lot.state}}
          </span>
          <span style="margin-left: 30px">
              <svg class="location_icon">
              <use href="src/assets/icons.svg#star" />
            </svg>{{lot.ratingsAverage}}</span>
        </div>
        <span style="color:white;font-style: italic; font-size: 16px; font-weight: bold; letter-spacing:0.7px">Rs. {{lot.price}} Per Hour</span>
      </div>
      <lot-map :lot="lot"></lot-map>
      <lot-reviews :reviews="lot.reviews"></lot-reviews>
    </div>
    <div v-if="error">
      <app-error :msg="'No parking lot exist with this id'" :title="'Invalid Id'"></app-error>
    </div>
    <div class="footer">
        <div>
            <h2>What are you waiting for?</h2>
            <p>Travel the world without having the problem of parking.</p>
        </div>
        <button class="btn_login_book"><router-link :to="$store.getters.getUser.name?'/book-lot?id='+lot._id:'/signin'">{{$store.getters.getUser.name?"BOOK SPACE NOW":"LOGIN TO BOOK SPACE"}}</router-link></button>
    </div>
  </div>
</template>

<script>
import appError from "./PageNotFound";
import lotMap from "./LotMap"
import Axios from "axios";
import lotReviews from "./LotReviews";
export default {
  data() {
    return {
      lot: {},
      error: false
    };
  },
  async beforeCreate() {
    try {
      const res = await Axios.get(
        `${process.env.HOST_URL}api/v1/parking-lots/${this.$route.query.id}`
      );
      this.lot = res.data.data;
    } catch (err) {
      this.error = true;
      console.log("invalid id");
    }
  },
  components: {
    appError,
    lotMap,
    lotReviews
  }
};
</script>

<style scoped>
.header {
  width: 100vw;
  height: 95vh;
  background-repeat: no-repeat;
  background-size: 100vw 95vh;
  text-align: center;
}
.header h1 {
  color: rgb(241, 228, 228);
  text-transform: uppercase;
  display: inline-block;
  background: linear-gradient(to right, rgb(28, 126, 4), rgb(11, 192, 65));
  padding: 10px;
  margin-top: 80px;
}
@media screen and (max-width: 768px) {
  .header {
    background: none;
  }
}
.header_details {
  padding: 30px 0px;
  color: white;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  letter-spacing: 0.6px;
}
.location_icon {
  fill: white;
  height: 35px;
  width: 35px;
  margin-top: 5px
}
.footer{
    display: flex;
    justify-content: space-evenly;
    border-radius: 20px;
    box-shadow: 4px 4px 10px black;
    padding: 30px 50px;
    margin: 60px auto;
    width: 60%;
    color: white;
    background: linear-gradient(rgb(57, 212, 57), rgb(16, 161, 16));
}
h2{
    /* color:rgb(241, 228, 228); */
    color: lightgray
}
.btn_login_book{
    margin: auto 0px;
    height: 50px;
    background-color: rgb(8, 121, 8);
    border: none;
    padding: 10px 30px;
    color: white;
    border-radius: 25px;
    transition: all 0.3s;
}
button{
  transition: all 0.3s;
}
button:hover{
    box-shadow: 2px 2px 8px black;
    transform: translateY(-5px);
}
a{
    color: white;
}
@media screen and (max-width: 1200px){
    .footer{
        width: 90%;
        flex-direction: column;
        font-size: 14px;
        padding: 30px 20px;
        border-radius: 5px;
    }
    h2{
        font-size: 22px;
    }
    h1{
        font-size: 30px;
    }
    .header_details{
      font-size: 14px;
    }
}
</style>