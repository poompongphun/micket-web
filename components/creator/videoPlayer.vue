<template>
  <div>
    <v-card>
      <!-- Video -->
      <v-responsive :aspect-ratio="16 / 9">
        <vue-plyr :options="options">
          <video
            previewThumbnails
            controls
            playsinline
            :data-poster="thumbnail"
          >
            <source size="480" :src="video" type="video/mp4" />
          </video>
        </vue-plyr>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: '',
    },
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
}
</script>
