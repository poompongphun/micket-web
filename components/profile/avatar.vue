<template>
  <div>
    <v-avatar size="100" color="iconBg">
      <v-img
        :src="avatar || require('~/assets/profile/MicketProfile.png')"
        alt="alt"
      >
        <v-row
          v-if="!loadingAvatar"
          v-ripple
          class="fill-height ma-0 hoverAvatar"
          align="center"
          justify="center"
          @click="$refs.inputProfile.click()"
        >
          <v-icon color="white">mdi-upload</v-icon>
        </v-row>
        <v-row
          v-else
          class="fill-height ma-0 loadingAvatar"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="white"
          ></v-progress-circular>
        </v-row>
      </v-img>
    </v-avatar>
    <input
      ref="inputProfile"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFilePicked($event)"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    avatar: '',
    loadingAvatar: false,
  }),
  mounted() {
    this.avatar = this.$store.getters.loggedInUser.profile
  },
  methods: {
    async onFilePicked(e) {
      this.loadingAvatar = true
      const imgFile = e.target.files[0]
      if (!this.checkFile(imgFile)) {
        alert('Allow jpeg,jpg,png,tiff,gif,bmp,webp Only!')
      } else if (imgFile) {
        const response = await this.$store.dispatch('updateProfile', imgFile)
        if (response) {
          this.loadingAvatar = false
          this.avatar = response
        }
      }
    },
    checkFile(file) {
      // Allowing file type
      const allowedExtensions = /(\.jpeg|\.jpg|\.png|\.tiff|\.gif|\.bmp|\.webp)$/i
      if (allowedExtensions.exec(file.name)) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
.loadingAvatar {
  transition: 0.2s;
  background: rgba(0, 0, 0, 0.5);
}
.hoverAvatar {
  opacity: 0;
  transition: 0.2s;
  background: rgba(0, 0, 0, 0.5);
  &:hover {
    transition: 0.2s;
    opacity: 1;
    cursor: pointer;
  }
}
</style>
