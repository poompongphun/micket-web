<template>
  <div>
    <div v-if="movie.length !== 0">
      <h1>My Store</h1>
      <v-tabs
        v-model="tab"
        class="mb-2"
        background-color="defaultBg"
        mobile-breakpoint="0"
        show-arrows
      >
        <v-tab>
          <v-icon left>mdi-movie</v-icon>
          All
        </v-tab>
        <v-tab>
          <v-icon left>mdi-earth</v-icon>
          Public
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
          Private
        </v-tab>
      </v-tabs>
      <!-- <div v-for="movies in isPublic" :key="movies._id">
      <movie :movie-data="movies" />
    </div> -->
      <v-tabs-items v-model="tab" class="defaultBg">
        <v-tab-item v-for="i in 3" :key="i">
          <v-row dense>
            <v-col
              v-for="movies in isPublic"
              :key="movies._id"
              cols="6"
              sm="3"
              md="6"
              lg="4"
              xl="3"
            >
              <movieSet :movie-data="movies" @edit="clickEditGroup" />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
      <v-fab-transition>
        <v-btn
          color="navbar primary--text lighten-1"
          dark
          fixed
          bottom
          right
          fab
          :large="$vuetify.breakpoint.smAndUp"
          @click.stop="createMovie"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/empty.svg')"
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
            <h2>Not found your movie :(</h2>
            <v-btn
              class="my-3"
              color="primary"
              depressed
              @click.stop="createMovie"
            >
              Create Movie
            </v-btn>
          </div>
        </div>
      </v-img>
    </div>
    <createMovieDialog ref="createMovieDialog" />
    <editMovieGroupDialog ref="editMovieGroupDialog" />
  </div>
</template>

<script>
import movieSet from '@/components/creator/movieSet'
import createMovieDialog from '@/components/creator/createMovieDialog'
import editMovieGroupDialog from '@/components/creator/editMovieGroupDialog'
export default {
  components: {
    movieSet,
    createMovieDialog,
    editMovieGroupDialog,
  },
  validate({ store }) {
    return store.getters.loggedInUser.creator
  },
  async asyncData({ store }) {
    if (store.state.mystore.movieGroup.length === 0) {
      const responseMovie = await store.dispatch('mystore/getGroup')
      return { movie: responseMovie }
    } else return { movie: store.state.mystore.movieGroup }
  },
  data: () => ({
    movie: [],
    public: 'true',
    tab: 0,
  }),
  computed: {
    isPublic() {
      return this.movie.filter((movie) => {
        if (this.tab === 1) {
          return movie.public === true
        }
        if (this.tab === 2) {
          return movie.public === false
        } else return true
      })
    },
  },
  methods: {
    createMovie() {
      this.$refs.createMovieDialog.open()
    },
    clickEditGroup(id) {
      this.$refs.editMovieGroupDialog.open(id)
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
