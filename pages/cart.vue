<template>
  <div>
    <h1>Cart</h1>
    <!-- {{ this.$store.state.cart }} -->

    <v-row dense>
      <v-col cols="12" md="8">
        <v-card
          v-for="movie in $store.state.cart"
          :key="movie._id"
          class="my-2"
        >
          <v-row no-gutters>
            <v-col cols="4" md="3">
              <v-card class="elevation-0">
                <v-img :src="movie.media.thumbnail" width="100%"></v-img>
              </v-card>
            </v-col>
            <v-col cols="4" md="7" class="pa-3">{{ movie.name }}</v-col>
            <v-col cols="2" md="1" class="pa-2" align-self="center">
              {{ movie.price }}
            </v-col>
            <v-col cols="2" md="1" class="pa-2" align-self="center">
              <v-btn icon>
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mt-3 pa-2 text-right">
          <h2>$200</h2>
          <v-btn color="success" depressed>Check out</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  //   asyncData({ store }) {
  //     // if (store.state.cart.length === 0) {
  //     //   const responseMovie = await store.dispatch('mystore/getGroup')
  //     //   return { cart: responseMovie }
  //     // } else
  //     // return { cart: store.state.cart }
  //   },
  data: () => ({
    cart: [],
  }),
}
</script>
