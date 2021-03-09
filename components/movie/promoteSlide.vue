<template>
  <v-carousel
    cycle
    class="rounded-lg"
    height="auto"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(slide, i) in poster" :key="i">
      <v-responsive :aspect-ratio="16 / 6">
        <v-sheet color="navbar" height="100%">
          <v-row class="fill-height" align="center" justify="center" no-gutters>
            <v-col md="8" cols="12">
              <v-img
                :aspect-ratio="16 / 9"
                :src="slide.images"
                :lazy-src="require('~/assets/logo/GrayMicket.svg')"
              ></v-img>
            </v-col>
            <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="4">
              <div
                class="pa-5 normalText--text"
                :style="`overflow: auto; max-height: ${
                  $vuetify.breakpoint.lgAndUp ? '430px' : '320px'
                }`"
              >
                {{ slide.text }}
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-responsive>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    poster: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      colors: ['navbar'],
    }
  },
}
</script>
