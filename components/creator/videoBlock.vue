<template>
  <div>
    <!-- Show Movie -->
    <v-card elevation="0">
      <!-- Public / Private Icon -->
      <div class="status-icon">
        <v-icon v-if="movie.public" color="success" small> mdi-earth </v-icon>
        <v-icon v-else color="red" small> mdi-lock </v-icon>
        <span class="white--text">${{ movie.price }}</span>
      </div>
      <!-- Menu -->
      <v-menu
        offset-x
        bottom
        left
        transition="slide-x-reverse-transition"
        min-width="160"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-1"
            color="white"
            icon
            style="z-index: 1; position: absolute; right: 0px; top: 0px"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <!-- Menu List -->
        <v-list dense>
          <v-list-item v-if="movie.public" @click="makePrivate(movie._id)">
            <v-icon class="mr-3">mdi-lock</v-icon>
            <v-list-item-title>Private</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="makePublic(movie._id)">
            <v-icon class="mr-3">mdi-earth</v-icon>
            <v-list-item-title>Public</v-list-item-title>
          </v-list-item>
          <v-list-item @click="editPrice(movie._id)">
            <v-icon class="mr-3">mdi-cash-usd</v-icon>
            <v-list-item-title>Price</v-list-item-title>
          </v-list-item>
          <v-list-item @click="editMovie(movie._id)">
            <v-icon class="mr-3">mdi-pencil</v-icon>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteMovie(movie._id)">
            <v-icon class="mr-3">mdi-trash-can</v-icon>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <vdoPlayer
        :video="movie.media.video"
        :thumbnail="movie.media.thumbnail"
      />
    </v-card>
    <h3 class="py-1 overflow-hidden" style="height: 60px">
      {{ movie.name }}
    </h3>
  </div>
</template>

<script>
import vdoPlayer from '@/components/creator/videoPlayer'
export default {
  components: {
    vdoPlayer,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    makePublic(id) {
      //   const MovieIndex = this.movieSeason[ss].movie.findIndex(
      //     (movie) => movie.id === id
      //   )
      //   this.movieSeason[ss].movie[MovieIndex].public = true
      this.$emit('publish', { id, publish: true })
    },
    makePrivate(id) {
      //   const MovieIndex = this.movieSeason[ss].movie.findIndex(
      //     (movie) => movie.id === id
      //   )
      //   this.movieSeason[ss].movie[MovieIndex].public = false
      this.$emit('publish', { id, publish: false })
    },
    editPrice(id) {},
    editMovie(id) {},
    // Delete Movie
    deleteMovie(id) {
      //   const MovieIndex = this.movieSeason[ss].movie.findIndex(
      //     (movie) => movie.id === id
      //   )
      //   this.movieSeason[ss].movie.splice(MovieIndex, 1)

      this.$emit('delete', id)
    },
  },
}
</script>
