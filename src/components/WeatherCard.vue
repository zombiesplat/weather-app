<template>
    <v-fade-transition>
        <v-skeleton-loader
                v-if="!data || loading"
                type="heading, list-item, image, list-item@3, divider, list-item@5"
                max-width="460"
                class="mx-auto mt-sm-4 elevation-1"
        >
        </v-skeleton-loader>
        <v-card
                v-else
                class="mx-auto mt-sm-4"
                max-width="460"
        >
            <template>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline">
                            <v-autocomplete
                                    solo
                                    hide-details
                                    hide-no-data
                                    hide-selected
                                    prepend-inner-icon="mdi-magnify"
                                    :loading="searching"
                                    :search-input.sync="search"
                                    cache-items
                                    v-model="data.woeid"
                                    label="Search"
                                    :items="search_options"
                                    item-text="title"
                                    item-value="woeid"
                            >
                            </v-autocomplete>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ data.time | datetime }}, {{ data.consolidated_weather[0]['weather_state_name'] }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text>
                    <v-row align="center">
                        <v-col cols="6" class="text-center">
                            <span class="display-3">
                                {{ getTemperature(data.consolidated_weather[0]['the_temp']).toFixed(1) }}&deg;{{ scale }}
                            </span>
                            <br>
                            <span class="subtitle-1">
                                {{ getTemperature(data.consolidated_weather[0]['min_temp']).toFixed(0) }}&deg;/{{ getTemperature(data.consolidated_weather[0]['max_temp']).toFixed(0) }}&deg;
                            </span>
                        </v-col>
                        <v-col cols="6">
                            <v-img
                                    class="mx-auto"
                                    :src="`http://metaweather.com/static/img/weather/png/${data.consolidated_weather[0]['weather_state_abbr']}.png`"
                                    :alt="data.consolidated_weather[0]['weather_state_name']"
                                    :title="data.consolidated_weather[0]['weather_state_name']"
                                    width="92"
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon title="Wind">
                            mdi-fan
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>
                        {{ data.consolidated_weather[0]['wind_direction_compass'] }}&nbsp;
                        {{ data.consolidated_weather[0]['wind_speed'].toFixed(2) }} mph
                    </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon title="Humidity">
                            mdi-water-percent
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>
                        {{ data.consolidated_weather[0]['humidity'] }}%
                    </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon title="Barometer">
                            mdi-weight
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-subtitle>
                        {{ (data.consolidated_weather[0]['air_pressure']).toFixed(0) }} mbar.
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider></v-divider>

                <v-list class="transparent">
                    <template
                            v-for="(item, idx) in data.consolidated_weather"
                    >
                        <v-list-item
                                v-if="idx > 0"
                                :key="item.day"
                        >
                            <v-list-item-title :title="$options.filters.date(item.applicable_date)">
                                {{ item.applicable_date | dayName }}
                            </v-list-item-title>

                            <v-list-item-icon>
                                <v-img
                                        :src="`http://metaweather.com/static/img/weather/ico/${item['weather_state_abbr']}.ico`"
                                        :alt="item['weather_state_name']"
                                        :title="item['weather_state_name']"
                                ></v-img>
                            </v-list-item-icon>

                            <v-list-item-subtitle class="text-right">
                                {{ getTemperature(item['min_temp']).toFixed(0) }}&deg;/{{ getTemperature(item['max_temp']).toFixed(0) }}&deg;
                            </v-list-item-subtitle>
                        </v-list-item>
                    </template>
                </v-list>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            :disabled="scale === 'F'"
                            @click="changeDegrees('F')"
                    >
                        <v-icon>mdi-temperature-fahrenheit</v-icon>
                    </v-btn>
                    <v-btn
                            color="primary"
                            :disabled="scale === 'C'"
                            @click="changeDegrees('C')"
                    >
                        <v-icon>mdi-temperature-celsius</v-icon>
                    </v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-fade-transition>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        WEATHER_SEARCH_LOCATION_NAME,
        WEATHER_SEARCH_LOCATION_WOEID
    } from "@/store/actions/weather";
    import {SNACKBAR_ERROR} from "@/store/actions/snackbar";
    import _ from "lodash";

    export default {
        name: "WeatherCard",
        computed: {
            ...mapGetters("weather", {
                data: "data",
                searching: "searching",
                loading: "loading",
            }),
        },
        watch: {
            "data.woeid": function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.fetchWoeid(newVal);
                }
            },
            search: _.debounce(
                function (search_val) {
                    if (search_val) {
                        this.$store
                            .dispatch(
                                "weather/" + WEATHER_SEARCH_LOCATION_NAME,
                                {location: search_val},
                                {root: true}
                            )
                            .then(
                                (response) => {
                                    this.search_options = response.data;
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
                    }
                },
                300
            ),
        },
        methods: {
            changeDegrees(newScale) {
                this.scale = newScale;
            },
            getTemperature(temperature) {
                temperature = Number(temperature);
                if (this.scale === 'F') {
                    return (temperature * 9/5) + 32;
                }
                return temperature;
            },
            fetchWoeid(woeid) {
                this.$store.dispatch(
                    "weather/" + WEATHER_SEARCH_LOCATION_WOEID,
                    {woeid: woeid},
                    {root: true}
                )
                    .then(
                        response => {
                            this.search_items = [response];
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
        created() {
            if (!this.data || !this.data.woeid) {
                this.fetchWoeid(this.search_options[0]['woeid']);
            } else {
                this.search_options = [this.data];
            }
        },
        data () {
            return {
                search: 'Phoenix',
                search_options: [
                    {
                        latt_long: "33.448261,-112.075768",
                        location_type: "City",
                        title: "Phoenix",
                        woeid: 2471390,
                    }
                ],
                woeid: null,
                scale: 'C',
            }
        },
    }
</script>