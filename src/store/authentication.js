import Axios from "axios"

const state={
    user:{}
}

const actions={
    async setUser({state}){
        try{
            const res= await Axios.get(`${process.env.HOST_URL}api/v1/users/getMe`,{withCredentials: true});
            state.user=res.data.data;
        } catch (err){
            console.log(err);
        }
    }
}
const mutations={
    saveUser(state,user){
        state.user=user;
    }
}
const getters={
    getUser(state){
        return state.user;
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}