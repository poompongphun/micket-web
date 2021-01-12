<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="defaultBg"
      show-arrows
      mobile-breakpoint="0"
    >
      <v-tab v-for="(season, i) in movieSeason" :key="i">
        {{ season.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pt-3 defaultBg">
      <v-tab-item v-for="(season, i) in movieSeason" :key="i">
        <v-card class="defaultBg" flat>
          <v-row dense>
            <v-col
              v-for="movie in season.movie"
              :key="movie._id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <v-card class="elevation-0 defaultBg">
                <div class="status-icons">
                  <span class="white--text">${{ movie.price }}</span>
                </div>
                <v-card>
                  <v-img :src="movie.media.thumbnail">
                    <v-tooltip
                      v-if="!$store.getters.checkItemCart(movie._id)"
                      bottom
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="cart-btn ma-2"
                          color="primary"
                          fab
                          x-small
                          depressed
                          v-bind="attrs"
                          v-on="on"
                          @click="addToCart(movie)"
                        >
                          <v-icon>mdi-cart-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Add to cart</span>
                    </v-tooltip>
                    <v-tooltip v-else bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="cart-btn ma-2"
                          color="error"
                          fab
                          x-small
                          depressed
                          v-bind="attrs"
                          v-on="on"
                          @click="deleteCart(movie._id)"
                        >
                          <v-icon>mdi-cart-remove</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </v-img>
                </v-card>
                <h3
                  class="py-1 overflow-hidden"
                  style="height: 60px; font-size: 1.1rem"
                >
                  {{ movie.name }}
                </h3>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  props: {
    movieSeason: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    tab: null,
  }),
  methods: {
    addToCart(movie) {
      this.$store.dispatch('addCart', movie)
    },
    deleteCart(id) {
      this.$store.dispatch('deleteCart', id)
    },
  },
}
</script>

<style lang="scss">
.status-icons {
  position: absolute;
  top: 0;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 3px;
  border-top-right-radius: 0px !important;
  z-index: 1;
}
.cart-btn {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>