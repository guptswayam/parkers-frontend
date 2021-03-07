import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication"
import parkingLot from "./parkingLot"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        authentication,
        parkingLot
    }
})
