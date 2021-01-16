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
      <v-card
        class="mx-1"
        :width="itemWidthResponsive"
        v-on="on"
        @click="$router.push(`/movie/${movieDetail._id}`)"
      >
        <v-img :src="movieDetail.poster.x" :height="imgHeightResponsive">
          <div v-if="isWishlist" style="position: absolute">
            <span
              v-if="movieDetail !== 0"
              class="py-1 px-3 white--text rounded-r-lg font-weight-bold primary"
              style="opacity: 0.8"
            >
              On Wishlist
            </span>
          </div>
          <div class="text-right">
            <span
              v-if="movieDetail !== 0"
              class="py-1 px-3 green--text text--accent-3 rounded-l-lg font-weight-bold"
              style="background-color: rgba(0, 0, 0, 0.4)"
            >
              ${{ calcDiscount(movieDetail.price, movieDetail.discount) }}
            </span>
            <span
              v-else
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
            <v-tooltip v-for="btn in menuBtn" :key="btn.id" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-1"
                  color="iconBg"
                  :small="btnMenuResponsive"
                  :disabled="
                    btn.id === 3 &&
                    movieDetail.user_id._id === $store.getters.loggedInUser._id
                  "
                  fab
                  depressed
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    btn.auth || $store.state.auth.loggedIn
                      ? clickBtn(btn.id, movieDetail._id)
                      : noAuth()
                  "
                >
                  <v-icon v-if="btn.id === 3">
                    {{ isWishlist ? btn.icon1 : btn.icon }}
                  </v-icon>
                  <v-icon v-else>{{ btn.icon }}</v-icon>
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
              {{
                calcPercent(movieDetail.like.like, movieDetail.like.dislike)
              }}% Likes
            </span>
          </v-row>
          <div class="mb-2">
            <v-chip
              v-for="tag in movieDetail.detail.tag"
              :key="tag"
              class="ml-1 mb-1"
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
      { id: 1, icon: 'mdi-play-outline', tooltip: 'Play Trailer', auth: true },
      { id: 2, icon: 'mdi-storefront-outline', tooltip: 'Store', auth: true },
      {
        id: 3,
        icon: 'mdi-plus',
        icon1: 'mdi-minus',
        tooltip: 'Add to Wishlist',
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
    isWishlist() {
      return this.$store.getters.loggedInUser
        ? this.$store.getters.loggedInUser.wishlist.some(
            (movie) => movie._id === this.movieDetail._id
          )
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
    calcPercent(like, dislike) {
      const percent = (like / (dislike + like)) * 100
      return parseInt(percent) || 0
    },
    clickBtn(id, movieId) {
      id === 3
        ? this.addToList(movieId)
        : this.$router.push(`/movie/${movieId}`)
    },
    addToList(id) {
      if (this.isWishlist) this.$store.dispatch('delWishlist', id)
      else this.$store.dispatch('addWishlist', id)
    },
    calcDiscount(price, percent) {
      const calc = price - (price / 100) * percent
      return calc.toFixed(2)
    },
  },
}
</script>
