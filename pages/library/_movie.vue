<template>
  <div>
    <v-expand-transition>
      <v-card
        v-show="video !== ''"
        class="iconBg elevation-0"
        width="100%"
        height="390"
      >
        <v-responsive :key="video" class="black mx-auto" width="700">
          <vue-plyr :options="options" style="width: 100%">
            <video previewThumbnails controls playsinline>
              <source size="480" :src="video" type="video/mp4" />
              <source size="720" :src="video" type="video/mp4" />
              <source size="1080" :src="video" type="video/mp4" />
            </video>
          </vue-plyr>
        </v-responsive>
      </v-card>
    </v-expand-transition>
    <v-tabs
      v-model="tab"
      background-color="defaultBg"
      show-arrows
      mobile-breakpoint="0"
    >
      <v-tab v-for="(season, i) in movies" :key="i">
        {{ season.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pt-3 defaultBg">
      <v-tab-item v-for="(season, i) in movies" :key="i">
        <v-card class="defaultBg" flat>
          <v-row dense>
            <v-col
              v-for="movie in season.movie"
              :key="movie._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-card
                class="elevation-0 defaultBg"
                :disabled="movie.media.video === video"
                @click="playVdo(movie.media.video)"
              >
                <v-card>
                  <v-img :src="movie.media.thumbnail"></v-img>
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
  async validate({ store, params }) {
    if (!store.state.library.length) {
      await store.dispatch('getLibrary')
    }
    return (
      store.state.library.some((movie) => movie._id === params.movie) &&
      store.state.auth.loggedIn
    )
  },
  async asyncData({ $axios, params, store }) {
    const ownedMovie = await $axios.$get(
      `/api/users/me/library/${params.movie}`,
      {
        progress: false,
      }
    )
    return {
      movies: ownedMovie,
    }
  },
  data: () => ({
    movies: [],
    tab: null,
    renderComponent: true,
    options: {
      ratio: '16:9',
      autoplay: true,
      //   controls: ['play', 'progress', 'current-time'],
      //   fullscreen: {
      //     enabled: false,
      //     fallback: true,
      //     iosNative: false,
      //     container: null,
      //   },
    },
    video: '',
  }),
  methods: {
    playVdo(url) {
      this.video = url
    },
  },
}
</script>
