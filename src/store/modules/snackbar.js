import {
    SNACKBAR_INFO,
    SNACKBAR_SUCCESS,
    SNACKBAR_WARNING,
    SNACKBAR_ERROR,
    SNACKBAR_RESET,
    SNACKBAR_SET_VISIBILITY
} from "../actions/snackbar";

const state = {
    color: "info",
    visible: false,
    text: null,
    timeout: 10000,
    multiline: true,
    icon: "mdi-information"
};

const actions = {
    [SNACKBAR_INFO]: ({ commit }, text) => {
        commit(SNACKBAR_INFO, text);
    },
    [SNACKBAR_SUCCESS]: ({ commit }, text) => {
        commit(SNACKBAR_SUCCESS, text);
    },
    [SNACKBAR_WARNING]: ({ commit }, text) => {
        commit(SNACKBAR_WARNING, text);
    },
    [SNACKBAR_ERROR]: ({ commit }, text) => {
        commit(SNACKBAR_ERROR, text);
    },
    [SNACKBAR_RESET]: ({ commit }) => {
        commit(SNACKBAR_RESET);
    }
};

const mutations = {
    [SNACKBAR_INFO]: (state, text) => {
        state.text = text;
        state.color = "info";
        state.visible = true;
        state.icon = "mdi-information";
        // Vue.set(state, "profile", profile);
    },
    [SNACKBAR_SUCCESS]: (state, text) => {
        state.text = text;
        state.color = "success";
        state.visible = true;
        state.icon = "mdi-check-circle";
        // Vue.set(state, "profile", profile);
    },
    [SNACKBAR_WARNING]: (state, text) => {
        state.text = text;
        state.color = "warning";
        state.visible = true;
        state.icon = "mdi-alert-circle";
        // Vue.set(state, "profile", profile);
    },
    [SNACKBAR_ERROR]: (state, text) => {
        state.text = text;
        state.color = "error";
        state.visible = true;
        state.icon = "mdi-alert";
        // Vue.set(state, "profile", profile);
    },
    [SNACKBAR_RESET]: state => {
        state.visible = false;
        state.text = "";
        state.color = "info";
        state.icon = "mdi-information";
    },
    [SNACKBAR_SET_VISIBILITY]: (state, value) => {
        state.visible = value;
    }
};

const getters = {
    getText: state => state.text,
    getColor: state => state.color,
    getVisible: state => state.visible,
    getTimeout: state => state.timeout,
    getMultiline: state => state.multiline,
    getIcon: state => state.icon
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
