<template>
  <v-menu
    open-on-hover
    transition="scale-transition"
    origin="center center"
    :max-width="menuWidth"
    :nudge-left="(menuWidth - itemWidth) / 2"
    open-delay="300"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-card class="mx-1" :width="itemWidth" v-on="on">
        <v-img :src="movieDetail.poster" :height="imgHeight">
          <div class="text-right">
            <span
              class="py-1 px-3 white--text rounded-l-lg font-weight-bold"
              style="background-color: rgba(0, 0, 0, 0.4)"
            >
              ฿{{ movieDetail.price }}
            </span>
          </div>
        </v-img>
      </v-card>
    </template>
    <v-card :width="menuWidth">
      <v-img :src="movieDetail.poster" :height="imgHeight"></v-img>
      <div class="pa-2">
        <div class="mt-1 mb-3">
          <v-tooltip v-for="btn in menuBtn" :key="btn.index" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-1"
                color="iconBg"
                fab
                depressed
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ btn.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ btn.tooltip }}</span>
          </v-tooltip>
        </div>
        <v-row class="pa-2 mb-2" justify="space-between" no-gutters>
          <span class="font-weight-bold normalText--text">
            {{ movieDetail.own_count }} Users own this
          </span>
          <span class="font-weight-bold success--text">
            {{ toFixed((movieDetail.like * 100) / movieDetail.own_count) }}
            % Likes
          </span>
        </v-row>
        <div class="mb-2">
          <v-chip v-for="tag in movieDetail.tag" :key="tag" class="ml-1">
            {{ tag }}
          </v-chip>
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    movieDetail: {
      type: Object,
      required: false,
      default() {
        return {
          title: 'The Witcher',
          poster:
            'https://www.gamingdose.com/wp-content/uploads/2020/01/AAAABXH81uXzUNSVsIbZbV8eUidh4wf4mUXniE9hZb8926m7asXYaCh9XnjYuO4VSkZeJU_Nitzm8TotvouCYI15UIrX_tBp-1920x1080.jpg',
          price: 100,
          own_count: 1000,
          like: 125,
          tag: ['Sci-fi', 'Fantasy'],
        }
      },
    },
    itemWidth: {
      type: Number,
      required: false,
      default: 272,
    },
    menuWidth: {
      type: Number,
      required: false,
      default: 300,
    },
    imgHeight: {
      type: Number,
      required: false,
      default: 153,
    },
  },
  data: () => ({
    menuBtn: [
      { icon: 'mdi-play-outline', tooltip: 'Play Trailer' },
      { icon: 'mdi-storefront-outline', tooltip: 'Store' },
      { icon: 'mdi-thumb-up-outline', tooltip: 'Like' },
      { icon: 'mdi-thumb-down-outline', tooltip: 'Dislike' },
    ],
  }),
  methods: {
    toFixed(num) {
      const number = num.toFixed(2)
      return number
    },
  },
}
</script>
