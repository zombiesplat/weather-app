<template>
    <v-app id="inspire">
        <snackbar/>
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-list-item
                            :key="item.text"
                            :to="item.to"
                            link
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <span class="hidden-sm-and-down">Weather App</span>
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
    import snackbar from "@/components/Snackbar";

    export default {
        components: {snackbar},
        data: () => ({
            drawer: null,
            items: [
                {
                    icon: 'mdi-weather-sunny',
                    text: 'View Weather',
                    to: {name: 'Weather'},
                },
                {
                    icon: 'mdi-crosshairs-gps',
                    text: 'Set Location',
                    to: {name: 'Location'},
                },
            ],
        }),
    }
</script>