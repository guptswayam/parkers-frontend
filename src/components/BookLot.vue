<template>
  <div v-if="lot.name">
    <p
      class="alert alert-success"
      v-if="alert2"
      style="position:fixed;left:50%;transform:translateX(-50%)"
      key="success"
    >Your Booking is confirmed. Check it in bookings section.</p>
    <p
      class="alert alert-danger"
      v-if="alert1"
      style="position:fixed;left:50%;transform:translateX(-50%)"
      key="fail"
    >Parking Space not available in this lot at this time!!!</p>
    <h1>
      {{lot.name}}
      <small>({{lot.district}}, {{lot.state}})</small>
    </h1>
    <form class="form-group" @submit.prevent="bookLot">
      <label for="vehicleno">Vehicle No.</label>
      <input
        type="text"
        id="vehicle"
        placeholder="Vehicle no."
        class="form-control"
        required
        v-model="vehicleNo"
      />
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        class="form-control"
        placeholder="Name"
        required
        v-model="customerName"
      />
      <label for="arrival_date">Arrival Date</label>
      <select id="arrival_date" class="form-control" v-model="arrivalDate" required>
        <option v-for="date in dates" :key="date">{{date}}</option>
      </select>
      <label>Arrival Time</label>
      <br />
      <select v-model="arrival_hrs" class="arrival_time">
        <option v-for="i in 24" :key="i">{{i-1}}</option>
      </select>
      <span>hrs</span>
      <select v-model="arrival_mins" class="arrival_time">
        <option v-for="i in 12" :key="i">{{(i-1)*5}}</option>
      </select>
      <span>minutes</span>
      <br />
      <label for="parking_hours">Parking Hours</label>
      <input
        type="number"
        id="parking_hours"
        class="form-control"
        step="1"
        min="1"
        required
        v-model="parking_hrs"
        max="24"
      />
      <br />
      <button type="submit" class="btn btn-primary" id="paying">Pay Rs. {{this.parking_hrs*lot.price}}</button>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      customerName: "",
      vehicleNo: "",
      arrivalDate: "",
      arrival_hrs: 0,
      arrival_mins: 0,
      parking_hrs: 1,
      alert1: false,
      alert2: false
    };
  },
  computed: {
    lot() {
      return this.$store.getters.getParkingLot;
    },
    dates() {
      const d = new Date();
      const arr = [];
      for (let i = 0; i <= 6; i++) {
        const date = new Date(d.getTime() + i * 24 * 60 * 60 * 1000);
        arr.push(date.toDateString());
      }
      return arr;
    }
  },
  async created() {
    await this.$store.dispatch("setParkingLot", this.$route.query.id);
  },
  methods: {
    async bookLot() {
      document.getElementById("paying").textContent="Paying...";
      document.getElementById("paying").disabled=true;
      const formData = {};
      formData.vehicleNo = this.vehicleNo;
      formData.customerName = this.customerName;
      formData.entryTime = `${this.arrivalDate},${this.arrival_hrs}:${this.arrival_mins}`;
      formData.entryTime = new Date(formData.entryTime);
      formData.exitTime = new Date(
        formData.entryTime.getTime() + this.parking_hrs * 60 * 60 * 1000
      );
      formData.amount = this.parking_hrs * this.lot.price;
      formData.lot = this.lot._id;
      console.log(formData);
      try {
        await Axios({
          method: "POST",
          url: `${process.env.HOST_URL}api/v1/bookings`,
          data: formData,
          withCredentials: true
        });
        this.alert2=true;
        this.vehicleNo=this.customerName=this.arrivalDate="";
        this.vehicleNo="";
        this.customerName="";
        document.getElementById("paying").disabled=false;
        document.getElementById("paying").textContent=`Pay Rs. ${this.parking_hrs*this.lot.price}`;
        setTimeout(()=>{
            this.alert2=false;
        },4000);
      } catch (err) {
        console.log(err);
        this.alert1=true;
        setTimeout(()=>{
            this.alert1=false;
        },4000);
        document.getElementById("paying").disabled=false;
        document.getElementById("paying").textContent=`Pay Rs. ${this.parking_hrs*this.lot.price}`;
      }
    }
  }
};
</script>

<style scoped>
.arrival_time {
  padding: 5px 10px;
  margin: 0px 10px;
  border-radius: 3px;
}
div {
  width: 60%;
  margin: auto;
  padding: 30px 0px;
}
button {
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  div {
    width: 95%;
  }
  h1 {
    font-size: 24px;
  }
  small{
      display: block;
  }
}
</style>