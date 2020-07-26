import {
    WEATHER_SET_STATUS,
    WEATHER_SET_DATA,
    WEATHER_SEARCH_LOCATION_NAME,
    WEATHER_SEARCH_LOCATION_GPS,
    WEATHER_SEARCH_LOCATION_WOEID,
} from "../actions/weather";
import axios from "axios";

const apiUri = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api';

const state = {
    woeid: null,
    search: null,
    data: null,
    status: null,
};

const getters = {
    data: state => state.data,
    searching: state => state.status === 'searching',
    loading: state => state.status === 'loading',
};

const actions = {
    [WEATHER_SEARCH_LOCATION_NAME]: ({commit}, form) => {
        return new Promise((resolve, reject) => {
            let endpoint = `location/search/?query=${form.location}`;
            commit(WEATHER_SET_STATUS, 'searching');
            const url = `${apiUri}/${endpoint}`;
            axios.get(url)
                .then(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        resolve(response);
                    },
                    error => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(error);
                    }
                )
                .catch(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(response);
                    }
                );
        });
    },
    [WEATHER_SEARCH_LOCATION_GPS]: ({commit}, form) => {
        return new Promise((resolve, reject) => {
            let endpoint = `location/search/?lattlong=${form.location}`;
            commit(WEATHER_SET_STATUS, 'searching');
            const url = `${apiUri}/${endpoint}`;
            axios.get(url)
                .then(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        resolve(response);
                    },
                    error => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(error);
                    }
                )
                .catch(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(response);
                    }
                );
        });
    },
    [WEATHER_SEARCH_LOCATION_WOEID]: ({commit}, form) => {
        return new Promise((resolve, reject) => {
            const endpoint = `location/${form.woeid}`
            commit(WEATHER_SET_STATUS, 'loading');
            const url = `${apiUri}/${endpoint}`;
            axios.get(url)
                .then(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        commit(WEATHER_SET_DATA, response.data);
                        resolve(response);
                    },
                    error => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(error);
                    }
                )
                .catch(
                    response => {
                        commit(WEATHER_SET_STATUS, null);
                        reject(response);
                    }
                );
        });
    },
}

const mutations = {
    [WEATHER_SET_STATUS]: (state, status) => {
        state.status = status;
    },
    [WEATHER_SET_DATA]: (state, data) => {
        state.data = data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
