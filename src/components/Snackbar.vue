<template>
    <v-snackbar
            top
            v-model="visible"
            :timeout="timeout"
            :multi-line="multiline === true"
            :color="color"
            class="text-center"
    >
        <v-icon dark v-if="icon" class="snackbar-icon">{{ icon }}</v-icon>
        {{ text }}
        <template v-slot:action="{attrs}">
            <v-btn v-bind="attrs" :color="color" @click="closeSnackbar">Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import { mapGetters } from "vuex";
    import {
        SNACKBAR_RESET,
        SNACKBAR_SET_VISIBILITY
    } from "@/store/actions/snackbar";

    export default {
        computed: {
            ...mapGetters("snackbar", {
                text: "getText",
                color: "getColor",
                getVisible: "getVisible",
                timeout: "getTimeout",
                multiline: "getMultiline",
                icon: "getIcon"
            }),
            visible: {
                get: function() {
                    return this.getVisible;
                },
                set: function(value) {
                    this.$store.commit("snackbar/" + SNACKBAR_SET_VISIBILITY, value);
                }
            }
        },
        methods: {
            closeSnackbar() {
                this.$store.dispatch("snackbar/" + SNACKBAR_RESET, null, { root: true });
            }
        }
    };
</script>
<style lang="css">
    .snackbar-icon {
        line-height:0.65em;
    }
</style>
