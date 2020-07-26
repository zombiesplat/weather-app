import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

/** MODULES **/
import snackbar from "./modules/snackbar";
import weather from "./modules/weather";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {},
    getters,
    mutations,
    actions,
    modules: {
        snackbar,
        weather,
    },
});