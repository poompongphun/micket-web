<template>
  <div>
    <h1>Upload to {{ movieGroup.title }}</h1>
    <v-tabs
      v-model="tab"
      background-color="defaultBg"
      show-arrows
      mobile-breakpoint="0"
    >
      <v-tab v-for="(season, i) in movieSeason" :key="i">
        {{ season.name }}
        <v-icon
          v-if="season.movie.length === 0 && tab !== 0"
          right
          small
          @click="closeTab(i, season._id)"
        >
          mdi-close
        </v-icon>
      </v-tab>
      <!-- Add Tab Btn -->
      <v-btn
        class="pa-6"
        :disabled="movieSeason[movieSeason.length - 1].movie.length === 0"
        color="primary"
        icon
        @click="newSeason(movieGroup._id)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pt-3 defaultBg">
      <v-tab-item v-for="(season, i) in movieSeason" :key="i">
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
              <videoBlock
                :movie="movie"
                @publish="doPublish"
                @delete="doDelete"
                @edit="openEditMovie"
                @play="playVideo"
                @owned="showOwnedUsers"
              />
            </v-col>
            <v-col
              v-for="upload in uploadCom"
              :key="upload.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <!-- Upload -->
              <v-card class="iconBg elevation-0">
                <v-img :aspect-ratio="16 / 9" :lazy-src="upload.img">
                  <div class="d-flex center-in-img">
                    <v-progress-circular
                      class="mr-2"
                      indeterminate
                      color="primary"
                      :size="50"
                      :width="4"
                    ></v-progress-circular>
                  </div>
                  <v-chip
                    class="ma-1"
                    color="primary"
                    small
                    style="position: absolute; bottom: 0px"
                  >
                    Uploading...
                  </v-chip>
                </v-img>
              </v-card>
              <h3
                class="py-1 overflow-hidden"
                style="height: 60px; font-size: 1.1rem"
              >
                {{ upload.name }}
              </h3>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2">
              <!-- Upload -->
              <v-card
                class="iconBg elevation-0"
                @click="clickUpload(`inputMovie-${i}`)"
              >
                <v-responsive :aspect-ratio="16 / 9">
                  <v-row class="fill-height" justify="center" align="center">
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
          @change="uploadMovie($event, movieGroup._id, season._id)"
        />
      </v-tab-item>
    </v-tabs-items>
    <editMovieDialog ref="editMovieDialog" @update="updateMovie" />
    <videoPlayer ref="videoPlayer" />
    <ownedUsersDialog ref="ownedUsersDialog" />
  </div>
</template>

<script>
import videoBlock from '@/components/creator/videoBlock'
import editMovieDialog from '@/components/creator/editMovieDialog'
import videoPlayer from '@/components/creator/videoPlayer'
import ownedUsersDialog from '@/components/creator/ownedUsersDialog'
export default {
  components: {
    videoBlock,
    editMovieDialog,
    videoPlayer,
    ownedUsersDialog,
  },
  async validate({ store, params }) {
    if (store.state.mystore.movieGroup.length === 0) {
      await store.dispatch('mystore/getGroup')
    }
    return (
      store.state.mystore.movieGroup.some(
        (group) => group._id === params.upload
      ) && store.getters.loggedInUser.creator
    )
  },
  async asyncData({ $axios, params, store }) {
    const groupId = params.upload
    const responseGroup = store.state.mystore.movieGroup.find(
      (group) => group._id === groupId
    )
    const responseMovie = await $axios.$get(
      `/api/creator/movie/group/${groupId}`,
      { progress: false }
    )
    return { movieGroup: responseGroup, movieSeason: responseMovie }
  },
  data: () => ({
    movieGroup: null,
    movieSeason: [],

    tab: null,
    uploading: [],
  }),
  computed: {
    uploadCom() {
      return this.uploading.filter((upload) => upload.tab === this.tab)
    },
  },
  methods: {
    showOwnedUsers(id) {
      this.$refs.ownedUsersDialog.open(id)
    },
    // Add new Season
    async newSeason(id) {
      const responseSeason = await this.$axios.$post(
        `/api/creator/season/${id}`,
        { name: `Season ${this.movieSeason.length + 1}` },
        { progress: false }
      )
      if (responseSeason) {
        this.movieSeason.push(responseSeason)
        this.tab = this.movieSeason.length - 1
      }
    },
    // Close Tab
    async closeTab(index, id) {
      const responseSeason = await this.$axios.$delete(
        `/api/creator/season/${id}`,
        { progress: false }
      )
      if (responseSeason) this.movieSeason.splice(index, 1)
    },
    doPublish(val) {
      const MovieIndex = this.movieSeason[this.tab].movie.findIndex(
        (movie) => movie._id === val.id
      )
      this.movieSeason[this.tab].movie[MovieIndex].public = val.publish
    },
    async doDelete(id) {
      try {
        const responseDelete = await this.$axios.$delete(
          `/api/creator/movie/${id}`,
          { progress: false }
        )
        if (responseDelete) {
          const MovieIndex = this.movieSeason[this.tab].movie.findIndex(
            (movie) => movie._id === id
          )
          this.movieSeason[this.tab].movie.splice(MovieIndex, 1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    openEditMovie(id) {
      this.$refs.editMovieDialog.open(id)
    },
    updateMovie(val) {
      const id = val.id
      const movieUpdate = val.data
      const MovieIndex = this.movieSeason[this.tab].movie.findIndex(
        (movie) => movie._id === id
      )
      this.movieSeason[this.tab].movie.splice(MovieIndex, 1, movieUpdate)
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
        const cover = await this.getVideoCover(file, 0)
        const tempId = Date.now()
        this.uploading.push({
          id: tempId,
          tab: index,
          name: file.name,
          img: URL.createObjectURL(cover),
        })

        const formData = new FormData()
        formData.append('movie', e.target.files[0])
        const uploadMovie = await this.$axios.$post(
          `/api/creator/movie/${groupId}/${seasonId}`,
          formData,
          { progress: false }
        )
        const coverFile = new File([cover], 'cover.webp', {
          type: 'image/webp',
        })
        const movieWithThumbnail = await this.uploadThumbnail(
          coverFile,
          uploadMovie._id
        )
        if (movieWithThumbnail && uploadMovie) {
          const tempIndex = this.uploading.findIndex(
            (upload) => upload.id === tempId
          )
          this.uploading.splice(tempIndex, 1)
          this.movieSeason[index].movie.push(movieWithThumbnail)
        } else this.movieSeason[index].movie.push(uploadMovie)
      }
    },
    async uploadThumbnail(file, id) {
      const imgFile = file
      if (imgFile) {
        try {
          const formData = new FormData()
          formData.append('thumbnail', imgFile)
          const response = await this.$axios.$post(
            `/api/creator/upload/thumbnail/${id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              progress: false,
            }
          )
          return response
        } catch (error) {
          return false
        }
      }
    },
    playVideo(url) {
      this.$refs.videoPlayer.play(url)
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
.center-in-img {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
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
