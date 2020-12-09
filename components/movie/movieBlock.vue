<template>
  <v-hover v-slot="{ hover }" class="mx-1">
    <v-card :class="{ 'on-hover': hover }" width="272">
      <v-img :src="img" height="153">
        <v-card-title class="title white--text">
          <v-row class="fill-height flex-column" justify="space-between">
            <p class="mt-4 subheading text-left">
              {{ title }}
            </p>

            <div>
              <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                {{ text }}
              </p>
              <p class="caption font-weight-medium font-italic text-left">
                {{ subtext }}
              </p>
            </div>

            <div class="align-self-center">
              <v-btn
                v-for="(icon, index) in icons"
                :key="index"
                :class="{ 'show-btns': hover }"
                color="transparent"
                icon
              >
                <v-icon :class="{ 'show-btns': hover }" color="transparent">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-card-title>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
    show: false,
    title: 'New Releases',
    text: `It's New Release Friday`,
    subtext: 'Newly released songs. Updated daily.',
    img:
      'https://www.gamingdose.com/wp-content/uploads/2020/01/AAAABXH81uXzUNSVsIbZbV8eUidh4wf4mUXniE9hZb8926m7asXYaCh9XnjYuO4VSkZeJU_Nitzm8TotvouCYI15UIrX_tBp-1920x1080.jpg',
  }),
}
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
