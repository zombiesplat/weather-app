<template>
    <v-sheet>
        <v-form @submit.prevent="searchLocation">
            <v-card
                    class="mx-auto mt-4"
                    max-width="460"
            >
                <v-card-title>
                    Search by Lat/Long
                </v-card-title>
                <v-card-text>
                    <v-row align="center">
                        <v-col cols="12">
                            <v-text-field
                                    solo
                                    hint="example: '33.448261,-112.075768'"
                                    prepend-inner-icon="mdi-magnify"
                                    label="Search"
                                    class="hidden-sm-and-down"
                                    v-model="search"
                                    :error="!!search_error"
                                    :error-messages="search_error"

                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            @click="searchLocation"
                            :loading="searching"
                    >
                        <v-icon>mdi-crosshairs-gps</v-icon>&nbsp;Search
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
        <v-card
                class="mx-auto mt-4"
                max-width="460"
                v-if="search_items.length"
        >
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12">
                        <v-list>
                            <template v-for="(item, idx) in search_items">
                                <v-list-item
                                        :key="`item-${idx}`"
                                >
                                    <v-list-item-content>
                                        {{ item.title }}
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn
                                                small
                                                @click="selectItem(item)"
                                                :loading="loading"
                                        >
                                            <v-icon small>
                                                mdi-open-in-new
                                            </v-icon>
                                            &nbsp;&nbsp;Select
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider
                                        v-if="idx + 1 < search_items.length"
                                        :key="idx"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script>
    import {mapGetters} from "vuex";
    import {SNACKBAR_ERROR} from "@/store/actions/snackbar";
    import {WEATHER_SEARCH_LOCATION_GPS, WEATHER_SEARCH_LOCATION_WOEID} from "@/store/actions/weather";

    export default {
        computed: {
            ...mapGetters("weather", {
                searching: "searching",
                loading: "loading",
            }),
        },
        watch: {
            search() {
                this.search_error = null;
            },
        },
        methods: {
            searchLocation() {
                const lat_long_re = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g;
                if (this.search.match(lat_long_re)) {
                    this.search_error = null;
                    this.$store
                        .dispatch(
                            "weather/" + WEATHER_SEARCH_LOCATION_GPS,
                            {location: this.search},
                            {root: true}
                        )
                        .then(
                            (response) => {
                                this.search_items = response.data;
                            },
                            () => {
                                this.$store.dispatch(
                                    "snackbar/" + SNACKBAR_ERROR,
                                    "Unable to retrieve search results",
                                    null,
                                    {root: true}
                                );
                            }
                        )
                        .catch(
                            () => {
                                this.$store.dispatch(
                                    "snackbar/" + SNACKBAR_ERROR,
                                    "Unable to retrieve search results",
                                    null,
                                    {root: true}
                                );
                            }
                        )
                } else {
                    this.search_error = "Invalid lat/long format";
                }
            },
            selectItem(item) {
                this.$store.dispatch(
                    "weather/" + WEATHER_SEARCH_LOCATION_WOEID,
                    {woeid: item.woeid},
                    {root: true}
                )
                    .then(
                        () => {
                            this.$router.push({name: 'Weather'})
                        },
                        () => {
                            this.$store.dispatch(
                                "snackbar/" + SNACKBAR_ERROR,
                                "Unable to retrieve weather data",
                                null,
                                {root: true}
                            );
                        }
                    )
                    .catch(
                        () => {
                            this.$store.dispatch(
                                "snackbar/" + SNACKBAR_ERROR,
                                "Unable to retrieve weather data",
                                null,
                                {root: true}
                            );
                        }
                    );
            },
        },
        data() {
            return {
                search: '',
                search_items: [],
                search_error: null,
            }
        },
    }
</script>