<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-nav href="#"><router-link to="/">
        <img src="/src/assets/parkers.png" />
        </router-link>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="user.name">
          <b-nav-item @click="logout">Logout</b-nav-item>
          <b-nav-item><router-link to="/bookings" active-class="link_active">Bookings</router-link></b-nav-item>
          <b-nav-item><router-link to="/account"><img :src="'https://parkers-0.herokuapp.com/img/user/'+user.photo" alt="photo" class="profile_pic">{{user.name.split(" ")[0]}}</router-link></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link to="/signin" active-class="link_active">Login</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/signup" active-class="link_active">Sign Up</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods:{
    async logout(){
      try{
        await Axios.get(`${process.env.HOST_URL}api/v1/users/logout`,{ withCredentials: true});
        location.assign("/");
      } catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
img {
  height: 40px;
  width: 120px;
}
a{
    color: darkgray;
    transition: .1s ease-in-out;
    margin: auto
}
a:hover{
    text-decoration: none;
    transform: scale(1.05);
    color: lightgray;
}
.link_active {
  color: white;
}
.profile_pic{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
}
@media screen and (max-width: 992px){
  a:hover{
    transform: none;
  }
}
</style>