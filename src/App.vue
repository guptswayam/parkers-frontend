<template>
  <div>
    <app-header></app-header>
    <router-view style="min-height:80vh"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from "./components/Navbar";
import appFooter from "./components/Footer"
export default {
  components: {
    appHeader,
    appFooter
  },
  async beforeCreate() {
    await this.$store.dispatch("setUser");
  }
};
</script>

<style>
label {
  margin-top: 20px;
}
button:focus{
  outline: none;
}
a:hover{
  text-decoration: none;
}
</style>