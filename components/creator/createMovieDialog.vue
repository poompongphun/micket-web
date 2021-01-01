<template>
  <v-dialog
    v-model="dialog"
    width="700"
    scrollable
    :persistent="loading"
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <v-card-title class="headline">
        Create new movie
        <v-btn icon absolute right :disabled="loading" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form action="#" autocomplete="off">
          <v-text-field
            v-model="title"
            :disabled="loading"
            :error-messages="titleErrors"
            name="title"
            label="Title"
            counter
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="description"
            :disabled="loading"
            :error-messages="descriptionErrors"
            name="description"
            label="Description"
            auto-grow
            row-height="24"
            rows="1"
            counter
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-textarea>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-hover v-slot="{ hover }">
                <v-card
                  class="pa-2"
                  :class="{ 'poster-error': vError }"
                  :disabled="loading"
                  height="250"
                  @click="vImgClick"
                >
                  <v-responsive
                    class="iconBg mx-auto imgBox"
                    width="157.75"
                    height="100%"
                    :aspect-ratio="16 / 9"
                  >
                    <v-img
                      height="100%"
                      width="100%"
                      :aspect-ratio="27 / 40"
                      contain
                      :src="vImg.preview"
                    >
                      <div
                        v-if="vImg.preview === ''"
                        class="d-flex center-in-img"
                      >
                        <div class="text-center">
                          <v-icon large>mdi-file-image</v-icon>
                          <br />
                          <span class="grey--text">Vertical Poster</span>
                        </div>
                      </div>
                      <div v-else>
                        <v-btn
                          class="float-right ma-1"
                          fab
                          depressed
                          color="iconBg"
                          x-small
                          style="opacity: 0.7"
                          @click="vImg.preview = ''"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </v-img>
                  </v-responsive>
                  <div
                    v-if="vImg.preview === ''"
                    class="d-flex iconBg darken-2 v-card--reveal white--text"
                    :class="{ 'on-hover': hover }"
                    style="height: 100%; margin-left: -8px"
                  >
                    <v-icon large color="white">mdi-upload</v-icon>
                    <br />
                    <h2>Upload</h2>
                  </div>
                </v-card>
              </v-hover>
              <input
                ref="inputV"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFilePickedV"
              />
              <div class="error-msg red--text">{{ error.vposter }}</div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-hover v-slot="{ hover }">
                <v-card
                  class="pa-2 d-flex justify-center align-center"
                  :disabled="loading"
                  :class="{ 'poster-error': hError }"
                  height="250"
                  @click="hImgClick"
                >
                  <v-responsive class="iconBg imgBox" :aspect-ratio="16 / 9">
                    <v-img
                      height="100%"
                      width="100%"
                      :aspect-ratio="16 / 9"
                      contain
                      :src="hImg.preview"
                    >
                      <div
                        v-if="hImg.preview === ''"
                        class="d-flex center-in-img"
                      >
                        <div class="text-center">
                          <v-icon large>mdi-image-area</v-icon>
                          <br />
                          <span class="grey--text">Horizon Poster</span>
                        </div>
                      </div>
                      <div v-else>
                        <v-btn
                          class="float-right ma-1"
                          fab
                          depressed
                          color="iconBg"
                          x-small
                          style="opacity: 0.7"
                          @click="hImg.preview = ''"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </div>
                    </v-img>
                  </v-responsive>
                  <div
                    v-if="hImg.preview === ''"
                    class="d-flex iconBg darken-2 v-card--reveal white--text"
                    :class="{ 'on-hover': hover }"
                    style="height: 100%"
                  >
                    <v-icon large color="white">mdi-upload</v-icon>
                    <br />
                    <h2>Upload</h2>
                  </div>
                </v-card>
              </v-hover>
              <input
                ref="inputH"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFilePickedH"
              />
              <div class="error-msg red--text">{{ error.hposter }}</div>
            </v-col>
          </v-row>
        </v-form>
        <v-alert
          v-show="alertError && !loading"
          v-model="alertError"
          width="100%"
          type="error"
          dense
          dismissible
          text
          transition="scroll-y-transition"
        >
          {{ errors }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary darken-1"
          text
          :disabled="loading"
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary darken-1"
          :disabled="$v.$invalid || VposterError || HposterError || loading"
          text
          @click.prevent="submit"
        >
          <v-progress-circular
            v-show="loading"
            class="mr-2"
            indeterminate
            color="primary"
            :size="15"
            :width="2"
          ></v-progress-circular>
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    title: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(255),
    },
    description: {
      maxLength: maxLength(5000),
    },
  },
  data: () => ({
    dialog: false,
    title: '',
    description: '',
    vImg: {
      file: '',
      preview: '',
    },
    hImg: {
      file: '',
      preview: '',
    },

    loading: false,

    vError: false,
    hError: false,
    error: {
      vposter: '',
      hposter: '',
    },

    alertError: false,
    errors: '',
  }),
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength &&
        errors.push('Title must be at least 4 characters long')
      !this.$v.title.maxLength &&
        errors.push('Title must be at most 255 characters long')
      !this.$v.title.required && errors.push('Title is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength &&
        errors.push('Description must be at most 5000 characters long')
      return errors
    },
    VposterError() {
      if (this.vImg.preview !== '') {
        return false
      } else return true
    },
    HposterError() {
      if (this.hImg.preview !== '') {
        return false
      } else return true
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    vImgClick() {
      this.$refs.inputV.click()
    },
    hImgClick() {
      this.$refs.inputH.click()
    },
    onFilePickedV(e) {
      const fileV = e.target.files[0]
      if (!this.checkFile(fileV)) {
        this.error.vposter = 'Allow jpeg,jpg,png,tiff,gif,bmp,webp Only!'
        this.vError = true
      } else if (fileV) {
        this.error.vposter = ''
        this.vError = false

        this.vImg.file = fileV
        this.vImg.preview = URL.createObjectURL(fileV)
      }
    },
    onFilePickedH(e) {
      const fileH = e.target.files[0]
      if (!this.checkFile(fileH)) {
        this.error.hposter = 'Allow jpeg,jpg,png,tiff,gif,bmp,webp Only!'
        this.hError = true
      } else if (fileH) {
        this.error.hposter = ''
        this.hError = false

        this.hImg.file = fileH
        this.hImg.preview = URL.createObjectURL(fileH)
      }
    },
    checkImg() {
      if (this.vImg.preview === '') {
        this.error.vposter = 'Please upload poster'
        this.vError = true
      } else {
        this.error.vposter = ''
        this.vError = false
      }

      if (this.hImg.preview === '') {
        this.error.hposter = 'Please upload poster'
        this.hError = true
      } else {
        this.error.hposter = ''
        this.hError = false
      }
    },
    async submit() {
      this.loading = true
      this.$v.$touch()
      this.checkImg()
      if (!this.$v.$invalid && !this.VposterError && !this.HposterError) {
        const sendData = {
          title: this.title,
          description: this.description,
        }
        const posterX = this.hImg.file
        const posterY = this.vImg.file

        try {
          const responseMovie = await this.$axios.post(
            '/api/creator/movie-group/create',
            sendData
          )
          await this.uploadPoster('posterX', posterX, responseMovie.data._id)
          await this.uploadPoster('posterY', posterY, responseMovie.data._id)

          setTimeout(() => {
            this.loading = false
            this.dialog = false
            this.clear()
            this.$emit('newdata', responseMovie.data)
          }, 100)
        } catch (error) {
          this.alertError = true
          this.errors = error.response.data
        }
      }
    },
    async uploadPoster(type, img, id) {
      try {
        const formData = new FormData()
        formData.append('poster', img)
        await this.$axios.$post(`/api/creator/upload/${type}/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          progress: false,
        })
      } catch (error) {
        this.alertError = true
        this.errors = error.response.data
      }
    },
    checkFile(file) {
      // Allowing file type
      const allowedExtensions = /(\.jpeg|\.jpg|\.png|\.tiff|\.gif|\.bmp|\.webp)$/i
      console.log(file)
      if (allowedExtensions.exec(file.name)) {
        return true
      }
      return false
    },
    clear() {
      this.title = ''
      this.description = ''
      this.vImg = {
        file: '',
        preview: '',
      }
      this.hImg = {
        file: '',
        preview: '',
      }
      this.$v.$reset()
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
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
}
.on-hover {
  opacity: 0.8;
  transition: 0.3s;
}
.imgBox {
  border-radius: 5px;
}
.error-msg {
  margin-top: 3px;
}
.poster-error {
  border: 2px solid red;
}
</style>
