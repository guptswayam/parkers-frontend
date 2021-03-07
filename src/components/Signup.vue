<template>
  <div>
    <app-alert :msg="alertMessage" :alertType="alertType" v-if="alert"></app-alert>
    <h1>Signup form</h1>
    <form @submit.prevent="signupUser" class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Name"
        class="form-control"
        maxlength="20"
        v-model="formData.name"
        required
      />
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        class="form-control"
        v-model="formData.email"
        required
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        class="form-control"
        v-model="formData.password"
        minlength="8"
        required
      />
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        class="form-control"
        v-model="formData.confirmPassword"
        minlength="8"
        required
      />
      <br />
      <button type="submit" class="btn btn-secondary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import appAlert from "./Alert";
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      alert: false,
      alertType: "",
      alertMessage: ""
    };
  },
  methods: {
    async signupUser() {
      try {
        const res = await fetch(`${process.env.HOST_URL}api/v1/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formData)
        });
        const data = await res.json();
        if (data.status == "success") {
          this.alertMessage = "Thankyou for signing up";
          this.alertType = "success";
          this.alert = true;
          setTimeout(() => {
            this.$router.push("/signin");
          }, 3000);
        } else {
          this.alertMessage = data.message;
          this.alertType = "danger";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }
      } catch (err) {
        this.alertMessage = "Something went wrong!!!";
        this.alertType = "danger";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    }
  },
  components: {
      appAlert
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
.btn-secondary {
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
img {
  display: block;
  margin: auto;
  border-radius: 50%;
}
</style>