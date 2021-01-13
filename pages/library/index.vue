<template>
  <div>
    <div v-if="movies.length !== 0">
      <h1>Library</h1>
      <v-row dense align="center">
        <v-col
          v-for="movie in movies"
          :key="movie._id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card @click="$router.push(`/library/${movie._id}`)">
            <v-img :src="movie.poster.y"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/online_video.svg')"
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
            <h2>Not found your movie :(</h2>
            <v-btn class="my-3" color="primary" depressed to="/">
              Buy one
            </v-btn>
          </div>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  validate({ store }) {
    return store.state.auth.loggedIn
  },
  async asyncData({ $axios, store }) {
    if (store.state.library.length === 0) {
      const responseMovie = await store.dispatch('getLibrary')
      return { movies: responseMovie }
    } else return { movies: store.state.library }
  },
  data: () => ({
    movies: [],
  }),
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
