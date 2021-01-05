<template>
  <div>
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="1000"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Video -->
        <v-card-title class="py-3 px-0" primary-title>
          <v-btn icon absolute right x-small @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-responsive class="black" :aspect-ratio="16 / 9">
            <div v-if="showVideo">
              <vue-plyr :options="options">
                <video previewThumbnails controls playsinline>
                  <source size="480" :src="video" type="video/mp4" />
                </video>
              </vue-plyr>
            </div>
          </v-responsive>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // video: {
    //   type: String,
    //   required: true,
    // },
    // thumbnail: {
    //   type: String,
    //   required: false,
    //   default: '',
    // },
    options: {
      type: Object,
      required: false,
      default() {
        return {
          ratio: '16:9',
          controls: ['play', 'progress', 'current-time'],
          fullscreen: {
            enabled: false,
            fallback: true,
            iosNative: false,
            container: null,
          },
        }
      },
    },
  },
  data: () => ({
    dialog: false,
    showVideo: false,
    video: '',
  }),
  watch: {
    dialog(val) {
      if (val) {
        this.showVideo = true
      } else
        setTimeout(() => {
          this.showVideo = false
        }, 200)
    },
  },
  methods: {
    play(url) {
      this.video = url
      setTimeout(() => {
        this.dialog = true
      }, 200)
    },
  },
}
</script>
