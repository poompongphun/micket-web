<template>
  <div>
    <div v-if="$vuetify.breakpoint.xs">
      <v-text-field
        v-model="search"
        name="search"
        label="Search"
        block
        filled
        rounded
        dense
        hide-details
        single-line
        append-icon="mdi-magnify"
        @keydown.enter="onEnter"
      ></v-text-field>
      <v-divider class="my-3"></v-divider>
    </div>
    <div v-if="$fetchState.pending" style="height: 80vh">
      <v-row class="fill-height" justify="center" align="center">
        <div class="text-center py-10 px-15 rounded-xl">
          <v-progress-circular
            :size="80"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-row>
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else-if="movies.length !== 0">
      <h1>
        Result of <v-chip>{{ $route.query.search }}</v-chip>
      </h1>
      <v-card
        v-for="movie in movies"
        :key="movie._id"
        class="my-2"
        :to="`/movie/${movie._id}`"
      >
        <v-row no-gutters>
          <v-col cols="4" sm="3" md="2" align-self="center">
            <v-card class="elevation-0">
              <v-img
                :src="movie.poster.x"
                width="100%"
                :aspect-ratio="16 / 9"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="8" sm="9" md="10" class="px-2 py-1">
            <h3 class="primary--text px-1">{{ movie.title }}</h3>
            <div class="text-truncate">
              {{ movie.description }}
            </div>
            <div v-if="$vuetify.breakpoint.smAndUp" class="mt-1">
              <v-chip
                v-for="tag of movie.detail.tag"
                :key="tag"
                small
                class="mr-1"
              >
                {{ tag }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/search.svg')"
        contain
        :width="
          $vuetify.breakpoint.xs
            ? '90%'
            : $vuetify.breakpoint.mdAndDown
            ? '70%'
            : '50%'
        "
      >
        <div class="d-flex notfound-center-in-img">
          <div class="no-movie navbar">
            <h2>Not found result</h2>
          </div>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.movies = await this.$axios.$get(
      `/api/store/movie?search=${this.$route.query.search}`,
      { progress: false }
    )
  },

  data() {
    return {
      movies: [],
      search: '',
    }
  },
  watch: {
    '$route.query.search': '$fetch',
  },
  mounted() {
    if (this.$route.query.search) this.search = this.$route.query.search
  },
  methods: {
    onEnter() {
      if (this.search !== '') {
        this.$router.push({ path: 'search', query: { search: this.search } })
      }
    },
  },
}
</script>

<style lang="scss">
.notfound-center-in-img {
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
