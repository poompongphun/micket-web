<template>
  <v-carousel
    cycle
    height="auto"
    hide-delimiter-background
    show-arrows-on-hover
    style="max-height: 400px"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <v-row class="fill-height" align="center" justify="center" no-gutters>
          <v-col cols="8">
            <v-img
              src="https://www.gamingdose.com/wp-content/uploads/2020/01/AAAABXH81uXzUNSVsIbZbV8eUidh4wf4mUXniE9hZb8926m7asXYaCh9XnjYuO4VSkZeJU_Nitzm8TotvouCYI15UIrX_tBp-1920x1080.jpg"
            ></v-img>
          </v-col>
          <v-col cols="4">
            <div class="display-3">{{ slide }} Slide</div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }
  },
}
</script>
