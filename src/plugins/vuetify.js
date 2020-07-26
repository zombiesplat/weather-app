import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#95C1DD',
                secondary: '#9AB0E0',
                accent: '#90DCD2',
                error: '#a51e37',
                info: '#ffb6a6',
                success: '#83c264',
                warning: '#c9b56b',
            }
        }
    }
});
