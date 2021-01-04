<template>
  <v-dialog
    v-model="dialog"
    width="1000"
    scrollable
    persistent
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
  >
    <v-card min-height="500">
      <v-card-title class="headline">
        Upload movie
        <v-btn icon absolute right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <div>
        <!-- Tab -->
        <v-tabs v-model="tab" show-arrows mobile-breakpoint="0">
          <v-tab v-for="(item, i) in items" :key="i">
            {{ item.name }}
            <v-icon
              v-if="item.movie.length === 0 && tab !== 0"
              right
              small
              @click="closeTab(i, item._id)"
            >
              mdi-close
            </v-icon>
          </v-tab>
          <!-- Add Tab Btn -->
          <v-btn
            class="pa-6"
            :disabled="items[items.length - 1].movie.length === 0"
            color="primary"
            icon
            @click="newSeason(groupId)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-tabs>
      </div>
      <v-card-text class="pa-3">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, i) in items" :key="i">
            <v-card flat>
              <v-row dense>
                <v-col
                  v-for="movie in item.movie"
                  :key="movie._id"
                  cols="12"
                  sm="4"
                  md="3"
                >
                  <!-- Show Movie -->
                  <v-card elevation="0">
                    <!-- Public / Private Icon -->
                    <div class="status-icon">
                      <v-icon v-if="movie.public" color="success" small>
                        mdi-earth
                      </v-icon>
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
                          style="
                            z-index: 1;
                            position: absolute;
                            right: 0px;
                            top: 0px;
                          "
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                      <!-- Menu List -->
                      <v-list dense>
                        <v-list-item
                          v-if="movie.public"
                          @click="makePrivate(i, movie._id)"
                        >
                          <v-icon class="mr-3">mdi-lock</v-icon>
                          <v-list-item-title>Private</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-else @click="makePublic(i, movie._id)">
                          <v-icon class="mr-3">mdi-earth</v-icon>
                          <v-list-item-title>Public</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="editPrice(i, movie._id)">
                          <v-icon class="mr-3">mdi-cash-usd</v-icon>
                          <v-list-item-title>Price</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="editMovie(i, movie._id)">
                          <v-icon class="mr-3">mdi-pencil</v-icon>
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="deleteMovie(i, movie._id)">
                          <v-icon class="mr-3">mdi-trash-can</v-icon>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    <v-card>
                      <!-- Video -->
                      <v-responsive :aspect-ratio="16 / 9">
                        <vue-plyr :options="options">
                          <video
                            previewThumbnails
                            controls
                            playsinline
                            :data-poster="movie.media.thumbnail"
                          >
                            <source
                              size="480"
                              :src="movie.media.video"
                              type="video/mp4"
                            />
                          </video>
                        </vue-plyr>
                      </v-responsive>
                    </v-card>
                  </v-card>
                  <h3 class="py-1 overflow-hidden" style="height: 50px">
                    {{ movie.name }}
                  </h3>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <!-- Upload -->
                  <v-card
                    class="iconBg elevation-0"
                    @click="clickUpload(`inputMovie-${i}`)"
                  >
                    <v-responsive :aspect-ratio="16 / 9">
                      <v-row
                        class="fill-height"
                        justify="center"
                        align="center"
                      >
                        <v-icon large>mdi-plus</v-icon>
                      </v-row>
                    </v-responsive>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <!-- Input Video -->
            <input
              :ref="`inputMovie-${i}`"
              class="d-none"
              type="file"
              accept="video/*"
              @change="uploadMovie($event, groupId, item._id)"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    tab: null,
    groupId: '',
    options: {
      ratio: '16:9',
      controls: ['play', 'progress', 'current-time'],
      fullscreen: {
        enabled: false,
        fallback: true,
        iosNative: false,
        container: null,
      },
    },
    items: [
      {
        id: 1,
        text: 'Season 1',
        edit: false,
        movie: [],
      },
    ],
  }),
  methods: {
    async open(id) {
      this.dialog = true
      this.groupId = id
      const responseMovie = await this.$axios.get(`/api/creator/movie/${id}`)
      console.log(responseMovie.data)
      this.items = responseMovie.data
    },
    // Add new Season
    async newSeason(id) {
      const responseSeason = await this.$axios.post(
        `/api/creator/season/${id}`,
        { name: `Season ${this.items.length + 1}` }
      )
      if (responseSeason) {
        this.items.push(responseSeason.data)
        this.tab = this.items.length - 1
      }
    },
    // Close Tab
    async closeTab(index, id) {
      const responseSeason = await this.$axios.delete(
        `/api/creator/season/${id}`
      )
      if (responseSeason) this.items.splice(index, 1)
    },
    // Click to Upload
    clickUpload(ref) {
      this.$refs[ref][0].click()
    },
    // Upload Video
    async uploadMovie(e, groupId, seasonId) {
      const index = this.tab
      const file = e.target.files[0]
      if (file) {
        // const fileName = e.target.files[0].name
        // const cover = await this.getVideoCover(file, 0)
        const formData = new FormData()
        formData.append('movie', e.target.files[0])
        const uploadMovie = await this.$axios.$post(
          `/api/creator/movie/${groupId}/${seasonId}`,
          formData
        )
        this.items[index].movie.push(uploadMovie)
      }
    },
    makePublic(ss, id) {
      const MovieIndex = this.items[ss].movie.findIndex(
        (movie) => movie.id === id
      )
      this.items[ss].movie[MovieIndex].public = true
    },
    makePrivate(ss, id) {
      const MovieIndex = this.items[ss].movie.findIndex(
        (movie) => movie.id === id
      )
      this.items[ss].movie[MovieIndex].public = false
    },
    editPrice(ss, id) {},
    editMovie(ss, id) {},
    // Delete Movie
    deleteMovie(ss, id) {
      const MovieIndex = this.items[ss].movie.findIndex(
        (movie) => movie.id === id
      )
      this.items[ss].movie.splice(MovieIndex, 1)
    },
    // Get Video Thumbnails
    getVideoCover(file, seekTo = 0.0) {
      //   console.log('getting video cover for file: ', file)
      return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video')
        videoPlayer.setAttribute('src', URL.createObjectURL(file))
        videoPlayer.load()
        videoPlayer.addEventListener('error', (ex) => {
          Promise.reject(new Error('error when loading video file'), ex)
        })
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
          //   seek to user defined timestamp (in seconds) if possible
          //   if (videoPlayer.duration < seekTo) {
          //     Promise.reject(new Error('video is too short.'))
          //     return
          //   }
          // delay seeking or else 'seeked' event won't fire on Safari
          setTimeout(() => {
            videoPlayer.currentTime = Math.floor(
              Math.random() * videoPlayer.duration
            )
          }, 200)
          // extract video thumbnail once seeking is complete
          videoPlayer.addEventListener('seeked', () => {
            // console.log('video is now paused at %ss.', seekTo)
            // define a canvas to have the same dimension as the video
            const canvas = document.createElement('canvas')
            canvas.width = videoPlayer.videoWidth
            canvas.height = videoPlayer.videoHeight
            // draw the video frame to canvas
            const ctx = canvas.getContext('2d')
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height)
            // return the canvas image as a blob
            ctx.canvas.toBlob(
              (blob) => {
                resolve(blob)
              },
              'image/jpeg',
              0.75 /* quality */
            )
          })
        })
      })
    },
  },
}
</script>

<style lang="scss">
.status-icon {
  position: absolute !important;
  top: 0;
  padding: 5px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  z-index: 1;
}
</style>
