<template>
  <div>
    <promoteSlide :poster="poster" />
    <h2 class="py-2">Recommended</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
      mobile-breakpoint="0"
      class="custom-slide"
    >
      <v-slide-item v-for="movie in movies" :key="movie.title">
        <movieBlock
          :movie-detail="movie"
          :item-size-mobile="$vuetify.breakpoint.sm ? 1.1 : 1.3"
          :menu-size-mobile="$vuetify.breakpoint.sm ? 1.1 : 1.3"
        />
      </v-slide-item>
      <!-- <template v-slot:next> > </template> -->
    </v-slide-group>
  </div>
</template>

<script>
import promoteSlide from '@/components/movie/promoteSlide'
import movieBlock from '@/components/movie/movieBlock'
export default {
  components: {
    promoteSlide,
    movieBlock,
  },
  async asyncData({ $axios, store }) {
    const responseMovie = await $axios.$get(`/api/store/movie/`, {
      progress: false,
    })
    let posters = []
    if (store.state.library.length === 0) {
      const responsePoster = await store.dispatch('getPoster')
      posters = responsePoster
    } else posters = store.state.poster
    return { movies: responseMovie, poster: posters }
  },
  data: () => ({
    count: 5,
    model: null,
    movies: [],
    poster: [],
  }),
}
</script>

<style lang="scss">
.custom-slide .v-slide-group__next,
.custom-slide .v-slide-group__prev {
  position: absolute;
  z-index: 1;
  height: 100%;
  transition: 0.2s;
  i {
    color: white;
  }
}
.custom-slide .v-slide-group__next {
  right: 0px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}
.custom-slide .v-slide-group__prev {
  left: 0px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}
.custom-slide .v-slide-group__next--disabled,
.custom-slide .v-slide-group__prev--disabled {
  transition: 0.2s;
  opacity: 0;
}
</style>
