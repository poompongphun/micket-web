<template>
  <v-menu
    open-on-hover
    transition="scale-transition"
    origin="center center"
    :max-width="menuWidthResponsive"
    :nudge-left="(menuWidthResponsive - itemWidthResponsive) / 2"
    open-delay="300"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-card class="mx-1" :width="itemWidthResponsive" v-on="on">
        <v-img :src="movieDetail.poster.x" :height="imgHeightResponsive">
          <div class="text-right">
            <span
              class="py-1 px-3 white--text rounded-l-lg font-weight-bold"
              style="background-color: rgba(0, 0, 0, 0.4)"
            >
              ${{ movieDetail.price }}
            </span>
          </div>
        </v-img>
      </v-card>
    </template>
    <div>
      <!-- <haveAccount v-if="!this.$store.state.auth.loggedIn" /> -->
      <v-card :width="menuWidthResponsive">
        <v-img
          :src="movieDetail.poster.x"
          :height="imgMenuHeightResponsive"
        ></v-img>
        <div class="pa-2">
          <div class="mt-1 mb-3">
            <v-tooltip v-for="btn in menuBtn" :key="btn.index" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-1"
                  color="iconBg"
                  :small="btnMenuResponsive"
                  fab
                  depressed
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    btn.auth || $store.state.auth.loggedIn
                      ? $router.push(`/movie/${movieDetail._id}`)
                      : noAuth
                  "
                >
                  <v-icon>{{ btn.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ btn.tooltip }}</span>
            </v-tooltip>
          </div>
          <v-row class="pa-2 mb-2" justify="space-between" no-gutters>
            <span class="font-weight-bold normalText--text">
              {{ movieDetail.owned_user }} Users own this
            </span>
            <span class="font-weight-bold success--text">
              <!-- {{ toFixed((movieDetail.like * 100) / movieDetail.own_count) }} -->
              20 % Likes
            </span>
          </v-row>
          <div class="mb-2">
            <v-chip
              v-for="tag in movieDetail.detail.tag"
              :key="tag"
              class="ml-1"
              :x-small="btnMenuResponsive"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
// import haveAccount from '@/components/items/haveAccount'
export default {
  // components: {
  //   haveAccount,
  // },
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
    itemSizeMobile: {
      type: Number,
      required: false,
      default: 1,
    },
    menuWidth: {
      type: Number,
      required: false,
      default: 300,
    },
    menuSizeMobile: {
      type: Number,
      required: false,
      default: 1,
    },
    imgHeight: {
      type: Number,
      required: false,
      default: 153,
    },
  },
  data: () => ({
    menuBtn: [
      { icon: 'mdi-play-outline', tooltip: 'Play Trailer', auth: true },
      { icon: 'mdi-storefront-outline', tooltip: 'Store', auth: true },
      {
        icon: 'mdi-thumb-up-outline',
        tooltip: 'Like',
        auth: false,
      },
      {
        icon: 'mdi-thumb-down-outline',
        tooltip: 'Dislike',
        auth: false,
      },
    ],
  }),
  computed: {
    itemWidthResponsive() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.itemWidth / this.itemSizeMobile
        : this.itemWidth
    },
    imgHeightResponsive() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.imgHeight / this.itemSizeMobile
        : this.imgHeight
    },
    menuWidthResponsive() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.menuWidth / this.menuSizeMobile
        : this.menuWidth
    },
    imgMenuHeightResponsive() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.imgHeight / this.menuSizeMobile
        : this.imgHeight
    },
    btnMenuResponsive() {
      return this.$vuetify.breakpoint.smAndDown
        ? this.menuSizeMobile > 1.1
        : false
    },
    // imgHeightResponsive() {
    //   return this.$vuetify.breakpoint.smAndDown
    //     ? this.imgHeight / this.itemSizeMobile
    //     : this.imgHeight
    // },
  },
  methods: {
    toFixed(num) {
      const number = num.toFixed(2)
      return number
    },
    noAuth() {
      this.$store.commit('sethaveAccount', true)
    },
  },
}
</script>
