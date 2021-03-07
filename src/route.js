import mapbox from "./components/MapBox"
import Signin from "./components/Signin";
import parkingLot from "./components/ParkingLot"
import reviews from "./components/LotReviews";
import account from "./components/Account";
import bookLot from "./components/BookLot";
import myBookings from "./components/MyBookings"
import makeReview from "./components/MakeReview"
import signup from "./components/Signup"

import store from "./store/store"

export const routes=[
    { path: "",component: mapbox, name: "mapbox"},
    { path : "/signin", component: Signin, name:"signin", beforeEnter:(to, from, next)=>{
        if(!store.getters.getUser.name)
            next();
        else
            next(from);
    }},
    { path : "/signup", component: signup, name:"signup", beforeEnter:(to, from, next)=>{
        if(!store.getters.getUser.name)
            next();
        else
            next(from);
    }},
    { path : "/parking-lot", component: parkingLot, name: "parking-lot"},
    { path: "/reviews", component: reviews, name: "reviews"},
    { path : "/account", component: account, name: "account"},
    { path : "/book-lot", component: bookLot, name: "bookLot"},
    { path : "/bookings", component: myBookings, name: "bookings"},
    { path : "/make-review", component: makeReview, name: "makeReview", beforeEnter:(to, from, next)=>{
        if(!to.query.lot){
            next(from);
        }
        else
            next();
    }},
    { path : "*", redirect: "/"}
]