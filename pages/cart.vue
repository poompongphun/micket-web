<template>
  <div>
    <div v-if="$store.state.cart.length !== 0">
      <v-row dense>
        <v-col cols="12" md="8">
          <v-card class="pa-2">
            <h1>Cart</h1>
            <v-divider class="mb-2"></v-divider>
            <v-row no-gutters>
              <v-col cols="4" md="3" lg="3">Movie</v-col>
              <v-col cols="4" md="6" lg="6" class="pl-2">Name</v-col>
              <v-col cols="2" md="2" lg="2" class="text-center">Price</v-col>
              <v-col cols="2" md="1" lg="1" class="text-center">Action</v-col>
            </v-row>
          </v-card>
          <v-card
            v-for="movie in $store.state.cart"
            :key="movie._id"
            class="my-2"
          >
            <v-row no-gutters>
              <v-col cols="4" md="3" lg="3" align-self="center">
                <v-card class="elevation-0">
                  <v-img :src="movie.media.thumbnail" width="100%"></v-img>
                </v-card>
              </v-col>
              <v-col cols="4" md="6" lg="6" class="pa-3">
                {{ movie.name }}
              </v-col>
              <v-col
                cols="2"
                md="2"
                lg="2"
                class="pa-2 text-center"
                align-self="center"
              >
                ${{ toFixed(movie.price) }}
              </v-col>
              <v-col
                cols="2"
                md="1"
                lg="1"
                class="pa-2 text-center"
                align-self="center"
              >
                <v-btn icon @click="delCart(movie._id)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-0">
            <div class="pa-2">
              <h2>SUMMARY</h2>
            </div>
            <v-divider class="mb-2"></v-divider>
            <div class="pa-2">
              <v-row dense>
                <v-col cols="6"><h3>Subtotal</h3></v-col>
                <v-col cols="6" class="text-right">
                  <h3>${{ toFixed(sumPrice($store.state.cart)) }}</h3>
                </v-col>
                <v-col cols="6"><h3>Estimated tax</h3></v-col>
                <v-col cols="6" class="text-right">
                  <h3>${{ toFixed(0) }}</h3>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <div class="pa-2">
              <v-row dense>
                <v-col cols="6"><h3>Total</h3></v-col>
                <v-col cols="6" class="text-right">
                  <h3>${{ toFixed(sumPrice($store.state.cart)) }}</h3>
                </v-col>
                <v-col
                  v-if="
                    sumPrice($store.state.cart) >
                    $store.getters.loggedInUser.coins
                  "
                  cols="12"
                  class="text-center error--text"
                >
                  **You don't have enough money**
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <v-card-actions class="pa-2">
              <v-btn
                color="success"
                :disabled="
                  sumPrice($store.state.cart) >
                  $store.getters.loggedInUser.coins
                "
                depressed
                block
                @click="payMoney($store.state.cart)"
              >
                Check out
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/empty_cart.svg')"
        contain
        :width="
          $vuetify.breakpoint.xs
            ? '80%'
            : $vuetify.breakpoint.mdAndDown
            ? '60%'
            : '40%'
        "
      >
        <div class="d-flex center-in-img">
          <div class="no-movie navbar">
            <h2>Find your favorite movie :)</h2>
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
    cart: [],
  }),
  methods: {
    sumPrice(movie) {
      const initialValue = 0
      const sumPrice = movie.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price
      }, initialValue)
      return sumPrice
    },
    async payMoney(movie) {
      const movieId = []
      const sumPrice = this.sumPrice(movie)
      movie.forEach((movie) => {
        movieId.push(movie._id)
        this.$store.commit('deleteCart', movie._id)
      })
      const createBill = await this.$axios.$post(
        '/api/store/buy/bill',
        movieId,
        { progress: false }
      )
      const confirmPay = await this.$axios.$post(
        `/api/store/buy/${createBill._id}`
      )
      if (confirmPay) {
        this.$store.commit('useCoins', sumPrice)
      }
    },
    delCart(id) {
      this.$store.commit('deleteCart', id)
    },
    toFixed(num) {
      const number = num.toFixed(2)
      return number
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
