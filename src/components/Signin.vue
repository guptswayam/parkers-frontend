<template>
  <div>
    <p
      class="alert"
      :class="[{'alert-success':message.startsWith('Success')},{'alert-danger':!message.startsWith('Success')}]"
      v-if="alert"
      style="position:fixed;left:50%;transform:translateX(-50%)"
    >{{message}}</p>
    <h1>LOGIN FORM</h1>
    <form class="form-group" @submit.prevent="login">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
      />
      <br>
      <button class="btn btn-primary" type="submit">{{value}}</button>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      alert: false,
      value: "Login"
    };
  },
  methods: {
    async login() {
      try {
        this.value = "Logging in...";
        const res = await Axios({
          method: "POST",
          url:
            `${process.env.HOST_URL}api/v1/users/login`,
          data: {
            email: this.email,
            password: this.password
          },
          withCredentials: true
        });
        if (res.data.status == "success") {
          this.message = "Successfully Logged in";
          this.alert = true;
          await this.$store.dispatch("setUser");
          setTimeout(()=>{
              this.$router.push("/");
          },2000)
        }
      } catch (err) {
        this.value = "Login";
        this.alert=true;
        this.message="Invalid Email or Password!!!";
        setTimeout(()=>{
            this.alert=false;
        },3000);
        console.error(err);
      }
    }
  }
};
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
.btn-primary {
  transition: all 0.3s;
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