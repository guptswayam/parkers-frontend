<template>
    <div>
        <app-alert :msg="alertMessage" :alertType="alertType" v-if="alert"></app-alert>
        <h1>Make your review</h1>
        <form @submit.prevent="submitForm" class="form-group">
            <label for="description">Description</label>
            <textarea name="" id="description" cols="30" rows="5" placeholder="Description" class="form-control" v-model="desc" required></textarea>
            <label for="rating">Rating</label>
            <input type="number" id="rating" class="form-control" placeholder="Rating" max="5" min="1" v-model.number="rating" required>
            <br>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios'
import appAlert from "./Alert"
export default {
    components:{
        appAlert
    },
    data(){
        return {
            desc: "",
            rating: 5,
            alertMessage: "",
            alertType: "success",
            alert: false
        }
    },
    methods: {
        async submitForm(){
            try{
                await Axios({
                    method: `${this.$route.query.review?'PATCH':'POST'}`,
                    url: `${process.env.HOST_URL}api/v1/reviews/${this.$route.query.review?this.$route.query.review:''}`,
                    data: {
                        lot: this.$route.query.lot,
                        user: this.$store.getters.getUser._id,
                        review: this.desc,
                        rating: this.rating
                    },
                    withCredentials: true
                })
                this.alertMessage="Thankyou for reviewing a parking lot";
                this.alertType="success"
                this.alert=true;
            } catch(err){
                this.alertMessage="Something went wrong";
                this.alertType="danger"
                this.alert=true;
                console.log(err);
            }
            setTimeout(()=>{
                this.alert=false;
            },3000);
        }
    }
}
</script>


<style scoped>
div {
  width: 50%;
  margin: auto;
  padding: 30px 0px;
}
label {
  margin-top: 20px;
}
h1 {
  letter-spacing: 0.7px;
  color: rgb(69, 190, 69);
  margin: 20px 0px;
  text-align: center;
  text-transform: uppercase;
}
@media screen and (max-width: 768px) {
  div {
    width: 95%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>