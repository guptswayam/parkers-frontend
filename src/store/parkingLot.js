import Axios from "axios";
const state={
    lot: {}
}
const actions={
    async setParkingLot({state},id){
        try{
            const res=await Axios.get(`${process.env.HOST_URL}api/v1/parking-lots/${id}`);
            state.lot=res.data.data;
        }
        catch(err){
            console.log(err);
        }
    }
}

const getters={
    getParkingLot(state){
        return state.lot;
    }
}

export default {
    state,
    actions,
    getters
}