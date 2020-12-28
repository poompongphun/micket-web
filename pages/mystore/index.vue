<template>
  <div>
    <div v-if="movie.length !== 0">
      <h1>My Store</h1>
      <v-tabs
        v-model="tab"
        class="mb-2"
        background-color="defaultBg"
        mobile-breakpoint="0"
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
      <v-row dense>
        <v-col
          v-for="movies in isPublic"
          :key="movies._id"
          cols="4"
          sm="3"
          md="4"
        >
          <movie :movie-data="movies" @upload-click="uploadMovie" />
        </v-col>
      </v-row>
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
    <createMovieDialog ref="createMovieDialog" @newdata="newMovie" />
    <uploadMovieDialog ref="uploadMovieDialog" />
  </div>
</template>

<script>
import movie from '@/components/creator/movieSet'
import createMovieDialog from '@/components/creator/createMovieDialog'
import uploadMovieDialog from '@/components/creator/uploadMovieDialog'
export default {
  components: {
    movie,
    createMovieDialog,
    uploadMovieDialog,
  },
  validate({ store }) {
    return store.getters.loggedInUser.creator
  },
  fetch() {
    // const response = await this.$axios.get('/api/creator/movie')
    // this.movie = response.data
    this.movie = [
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Joker',
        description: 'are you joke?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Joker',
        description: 'are you joke?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Joker',
        description: 'are you joke?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Joker',
        description: 'are you joke?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Joker',
        description: 'are you joke?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
      {
        title: 'Avengure',
        description: 'Hello World',
        poster: {
          y:
            'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        },
        public: true,
      },
      {
        title: 'Jokeppppppppppppppppr',
        description:
          'are you jokessssssssssssssssssssssssssssssssssssssssssssjokessssssssssssssssssssssssssssssssssssssssssssjokessssssssssssssssssssssssssssssssssssssssssssjokessssssssssssssssssssssssssssssssssssssssssssjokessssssssssssssssssssssssssssssssssssssssssss?',
        poster: {
          y:
            'https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500',
        },
        public: false,
      },
    ]
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
    newMovie(val) {
      this.movie.unshift(val)
    },
    uploadMovie() {
      this.$refs.uploadMovieDialog.open()
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
