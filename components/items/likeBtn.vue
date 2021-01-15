<template>
  <div>
    <v-row no-gutters justify="center" align="center" style="max-width: 190px">
      <v-col cols="6">
        <v-btn
          class="pa-0"
          text
          :disabled="disable"
          :color="like ? 'success' : 'grey'"
          x-large
          rounded
          @click="$store.state.auth.loggedIn ? likeAction(movieId) : noAuth()"
        >
          <v-icon left>mdi-thumb-up</v-icon>
          {{ likeCount }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          class="pa-0"
          text
          :disabled="disable"
          :color="dislike ? 'red' : 'grey'"
          x-large
          rounded
          @click="
            $store.state.auth.loggedIn ? dislikeAction(movieId) : noAuth()
          "
        >
          <v-icon left>mdi-thumb-down-outline</v-icon>
          {{ dislikeCount }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    movieId: {
      type: String,
      required: true,
    },
    likeDetail: {
      type: Object,
      required: false,
      default: null,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    like: false,
    dislike: false,
    likeCount: 0,
    dislikeCount: 0,
  }),
  mounted() {
    const like = this.likeDetail.islike
    this.likeCount = this.likeDetail.like
    this.dislikeCount = this.likeDetail.dislike

    if (like === true) this.like = true
    else if (like === false) this.dislike = true
  },
  methods: {
    likeAction(id) {
      if (this.like) {
        const response = this.delLike(id)
        if (response) {
          this.like = false
          this.dislike = false
          this.likeCount -= 1
        }
      } else {
        const response = this.addLike(id, 'like')
        if (response) {
          if (this.dislike) {
            this.dislikeCount -= 1
            this.dislike = false
          }
          this.like = true
          this.likeCount += 1
        }
      }
    },
    dislikeAction(id) {
      if (this.dislike) {
        const response = this.delLike(id)
        if (response) {
          this.like = false
          this.dislike = false
          this.dislikeCount -= 1
        }
      } else {
        const response = this.addLike(id, 'dislike')
        if (response) {
          if (this.like) {
            this.likeCount -= 1
            this.like = false
          }
          this.dislike = true
          this.dislikeCount += 1
        }
      }
    },
    async addLike(id, type) {
      const sendLike = await this.$axios.$post(
        `/api/store/movie/${id}/${type}`,
        null,
        { progress: false }
      )
      return sendLike
    },
    async delLike(id) {
      const sendLike = await this.$axios.$delete(
        `/api/store/movie/${id}/removelike`,
        { progress: false }
      )
      return sendLike
    },
    noAuth() {
      this.$store.commit('sethaveAccount', true)
    },
  },
}
</script>
