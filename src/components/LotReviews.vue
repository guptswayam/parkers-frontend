<template>
  <div class="lot_reviews" v-if="upadatedReviews.length>=1||addReview" :class="{'remove_padding':upadatedReviews.length==0}">
    <div class="review_card" v-for="(review,i) in upadatedReviews" :key="i">
      <div class="review_writer">
        <img :src="'https://parkers-0.herokuapp.com/img/user/'+review.user.photo" alt="user_photo" />
        <h4 style="margin: 5px 0px auto 5px">{{review.user.name}}</h4>
      </div>
      <div>
        <br />
        <p>{{review.review}}</p>
      </div>
      <div class="rating">
        <svg v-for="(num,i) in review.rating" :key="i">
          <use href="/src/assets/icons.svg#star" />
        </svg>
      </div>
      <router-link class="edit_review" :to="'/make-review?lot='+$route.query.id+'&review='+review._id" v-if="updateReviewIndex==i">Edit Review</router-link>
    </div>
    <div v-if="reviews&&reviews.length>5" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%)">
      <router-link :to="{name: `reviews`, query: {id: $route.query.id}}" class="show_all btn">Show All</router-link>
    </div>
    <button class="btn btn-success add_review" v-if="addReview" @click="makeYourReview">Make Your Review</button>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: ["reviews"],
  data() {
    return {
      upadatedReviews: [],
      updateReviewIndex: -1,
      addReview: false
    };
  },
  async created() {
    if (this.reviews) this.upadatedReviews = [...this.reviews];
    else {
      const res = await Axios.get(
        `${process.env.HOST_URL}api/v1/parking-lots/${this.$route.query.id}`
      );
      this.upadatedReviews = res.data.data.reviews;
    }
    if (this.reviews) {
      for (let i = 0; i < this.upadatedReviews.length - 1; i++) {
        for (let j = i + 1; j < this.upadatedReviews.length; j++) {
          if (
            this.upadatedReviews[i].createdAt >
            this.upadatedReviews[j].createdAt
          ) {
            const temp = this.upadatedReviews[i];
            this.upadatedReviews[i] = this.upadatedReviews[j];
            this.upadatedReviews[j] = temp;
          }
        }
      }
      this.upadatedReviews.splice(0, this.upadatedReviews.length - 4);
    }
    this.upadatedReviews.reverse();
    const index=this.upadatedReviews.findIndex(el=>el.user._id==this.$store.getters.getUser._id);
    if(index!=-1)
      this.updateReviewIndex=index;
    else{
      const booking=this.userBookings.find(el=>this.$route.query.id==el.lot&&new Date(el.exitTime).getTime()<Date.now());
      if(booking){
        this.addReview=true;
      }
      else
        this.addReview=false;
    }
  },
  computed: {
    userBookings(){
      return this.$store.getters.getUser.bookings||[];
    }
  },
  methods: {
    makeYourReview(){
      this.$router.push({name: "makeReview", query:{lot: this.$route.query.id}});
    }
  }
};
</script>

<style scoped>
.lot_reviews {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  background: linear-gradient(rgb(57, 212, 57), rgb(10, 129, 10));
  padding: 100px 0px 60px;
  position: relative;
}
.remove_padding{
  padding: 80px 0px;
}
.review_card {
  text-align: justify;
  width: 250px;
  background-color: white;
  box-shadow: 3px 3px 6px black;
  padding: 30px 20px 50px;
  border-radius: 5px;
  min-height: 250px;
  margin: 0px 20px 40px 20px;
  position: relative;
  font-size: 12px;
}
.review_writer {
  display: flex;
  justify-content: center;
}
img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
h4 {
  color: rgb(10, 129, 10);
}
svg {
  width: 25px;
  height: 25px;
  fill: rgb(10, 129, 10);
}
.rating {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.show_all,.add_review{
    background-color: lightgreen;
    color: black;
    transition: all 0.2s;
}
.show_all:hover,.add_review:hover{
    box-shadow: 1px 1px 5px black;
    transform: translateY(-3px);
}
.edit_review{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  text-decoration: underline;
  color: rgb(10, 129, 10);
}
.add_review{
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  font-size: 14px;
}
.add_review:hover{
  transform: translate(-50%,-3px);
}
</style>