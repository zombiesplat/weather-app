import Vue from 'vue'
import VueRouter from 'vue-router'
import Location from "../views/Location";
import Weather from "../views/Weather";

Vue.use(VueRouter)

const routes = [
    {path: "/", redirect: "/weather"},
    {
        path: '/weather',
        name: 'Weather',
        component: Weather
    },
    {
        path: '/location',
        name: 'Location',
        component: Location
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
})

export default router
