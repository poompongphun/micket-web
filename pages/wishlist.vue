<template>
  <div>
    <div v-if="$store.getters.loggedInUser.wishlist.length !== 0">
      <v-row dense>
        <v-col cols="12" md="12">
          <v-card class="pa-2">
            <h1>Wishlist</h1>
            <v-divider
              v-if="$vuetify.breakpoint.smAndUp"
              class="mb-2"
            ></v-divider>
            <v-row v-if="$vuetify.breakpoint.smAndUp" no-gutters>
              <v-col cols="4" sm="3" lg="3">Movie</v-col>
              <v-col cols="4" sm="6" lg="7" class="pl-2">Detail</v-col>
              <v-col cols="4" sm="3" lg="2" class="text-center">Action</v-col>
            </v-row>
          </v-card>
          <v-card
            v-for="movie in $store.getters.loggedInUser.wishlist"
            :key="movie._id"
            class="my-2"
          >
            <v-row no-gutters>
              <v-col cols="12" sm="3" lg="3" align-self="center">
                <v-card class="elevation-0">
                  <v-img :src="movie.poster.x" width="100%"></v-img>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" lg="7" class="px-2 py-1">
                <h3 class="primary--text px-1">{{ movie.title }}</h3>
                <div>
                  {{ movie.description }}
                </div>
              </v-col>

              <v-col
                cols="12"
                sm="3"
                lg="2"
                class="pa-2 text-center"
                align-self="center"
              >
                <v-btn
                  class="mb-1"
                  color="primary"
                  block
                  depressed
                  :to="`/movie/${movie._id}`"
                >
                  <v-icon left>mdi-storefront</v-icon>
                  Store
                </v-btn>
                <v-btn
                  color="error"
                  block
                  depressed
                  @click="delWishlist(movie._id)"
                >
                  <v-icon left>mdi-trash-can</v-icon>
                  Delete
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/list.svg')"
        contain
        :width="
          $vuetify.breakpoint.xs
            ? '90%'
            : $vuetify.breakpoint.mdAndDown
            ? '70%'
            : '50%'
        "
      >
        <div class="d-flex center-in-img">
          <div class="no-movie navbar">
            <h2>Find your favorite movies and make a list!</h2>
            <v-btn class="my-3" color="primary" depressed to="/">
              Go to Store
            </v-btn>
          </div>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    wishlist: [],
  }),
  methods: {
    delWishlist(id) {
      this.$store.dispatch('delWishlist', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.center-in-img {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  .no-movie {
    opacity: 0.9;
    width: 100%;
    border-radius: 30px;
    padding: 15px;
  }
}
</style>
