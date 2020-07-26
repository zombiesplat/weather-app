import Vue from "vue";
import moment from "moment";

/**
 * Format the given date.
 */
Vue.filter('date', value => {
    if (!value) {
        return '';
    }
    return moment(value).local().format('MMMM Do, YYYY')
});


/**
 * Format the given date as a timestamp.
 */
Vue.filter('datetime', value => {
    if (!value) {
        return '';
    }
    return moment(value).local().format('MMMM Do, YYYY h:mm A');
});

Vue.filter('dayName', value => {
    if (!value) {
        return '';
    }
    return moment(value).local().format('dddd');
});