<template>
  <div>
    <v-row>
      <v-col cols="12" md="9">
        <v-row justify="center" align="center">
          <!-- Poster -->
          <v-col cols="12" sm="3" md="4" lg="3" xl="2">
            <v-img
              v-if="$vuetify.breakpoint.smAndUp"
              class="rounded"
              :aspect-ratio="27 / 40"
              max-width="200"
              :src="movie.poster.y"
            ></v-img>
            <v-img
              v-else
              class="rounded"
              :aspect-ratio="16 / 9"
              max-width="100%"
              :src="movie.poster.x"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="9" md="8" lg="9" xl="10">
            <!-- Title -->
            <v-row no-gutters>
              <v-col cols="12">
                <h1>{{ movie.title }}</h1>
              </v-col>
              <v-col cols="12">
                <!-- Description -->
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="overflow-auto" style="height: 125px">
                      {{ movie.description }}
                    </div>
                  </v-col>
                  <v-col>
                    <v-row no-gutters align="end">
                      <v-col cols="6">
                        <v-row no-gutters>
                          <!-- Like & Dislike -->
                          <v-col cols="12" class="py-1">
                            <v-row
                              no-gutters
                              justify="center"
                              align="center"
                              style="max-width: 190px"
                            >
                              <v-col cols="6">
                                <v-btn
                                  class="pa-0"
                                  text
                                  color="success"
                                  x-large
                                  rounded
                                >
                                  <v-icon left>mdi-thumb-up</v-icon>
                                  9999
                                </v-btn>
                              </v-col>
                              <v-col cols="6">
                                <v-btn
                                  class="pa-0"
                                  text
                                  color="grey"
                                  x-large
                                  rounded
                                >
                                  <v-icon left>mdi-thumb-down-outline</v-icon>
                                  222
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>

                          <!-- Wishlist -->
                          <v-col cols="12" align-self="end">
                            <v-btn
                              class="pa-5"
                              color="primary"
                              rounded
                              depressed
                            >
                              Add to Wishlist
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>

                      <!-- Buy Button -->
                      <v-col cols="6" class="text-right">
                        <div v-if="movie.price !== 0">
                          <div v-if="movie.discount === 0">
                            <h2>${{ movie.price.toFixed(2) }}</h2>
                          </div>
                          <div v-else>
                            <h2 class="success--text">
                              {{ movie.discount }}% off
                            </h2>
                            <s class="grey--text">${{ movie.price }}</s>
                            <span>
                              ${{ calcDiscount(movie.price, movie.discount) }}
                            </span>
                          </div>
                          <v-btn class="pa-5" color="success" rounded depressed>
                            Buy Pack
                          </v-btn>
                        </div>
                        <div v-else>
                          <v-btn
                            class="pa-5"
                            color="success"
                            width="120"
                            rounded
                            depressed
                          >
                            Free
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <!-- Content -->
          <v-col cols="12">
            <v-divider class="py-2"></v-divider>
            <movieSeason :movie-season="season" />
            <!-- <h2>Trailer</h2>
            <v-responsive :aspect-ratio="16 / 9" width="300">
              <vue-plyr>
                <div
                  data-plyr-provider="youtube"
                  data-plyr-embed-id="p_PJbmrX4uk"
                ></div>
              </vue-plyr>
            </v-responsive> -->
          </v-col>
        </v-row>
      </v-col>

      <!-- Detail -->
      <v-col cols="12" md="3" class="py-8">
        <v-divider
          v-if="$vuetify.breakpoint.smAndDown"
          class="py-2"
        ></v-divider>
        <div>
          Creator:
          <v-chip
            v-for="creator in movie.detail.creator"
            :key="creator"
            class="my-1 mr-1"
            small
          >
            {{ creator }}
          </v-chip>
        </div>
        <div>
          Stars:
          <v-chip
            v-for="star in movie.detail.star"
            :key="star"
            class="my-1 mr-1"
            small
          >
            {{ star }}
          </v-chip>
        </div>
        <div>
          Publisher:
          <v-chip class="my-1 mr-1" small>
            {{ movie.user_id.name }}
          </v-chip>
        </div>
        <div>
          Tag:
          <v-chip
            v-for="tag in movie.detail.tag"
            :key="tag"
            class="my-1 mr-1"
            small
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import movieSeason from '@/components/movie/movieSeason'
export default {
  components: {
    movieSeason,
  },
  async asyncData({ $axios, params }) {
    const responseMovie = await $axios.$get(
      `/api/store/movie/${params.movie}`,
      { progress: false }
    )
    return { movie: responseMovie.movie, season: responseMovie.season }
  },
  data: () => ({
    rating: 3,
    movie: null,
    season: [],
  }),
  methods: {
    calcDiscount(price, percent) {
      const calc = price - (price / 100) * percent
      return calc.toFixed(2)
    },
  },
}
</script>
