<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="700"
      scrollable
      :persistent="loading"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="headline">
          Edit movie
          <v-btn
            icon
            absolute
            right
            :disabled="loading"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form action="#" autocomplete="off">
            <v-row>
              <v-col cols="12" sm="8" md="7">
                <v-hover v-slot="{ hover }">
                  <v-card
                    width="100%"
                    class="elevation-0"
                    :disabled="loading || ImgLoading"
                    @click="$refs.inputThumbnail.click()"
                  >
                    <v-responsive class="iconBg imgBox" :aspect-ratio="16 / 9">
                      <v-img
                        :aspect-ratio="16 / 9"
                        contain
                        :src="
                          thumbnail || require('~/assets/logo/GrayMicket.svg')
                        "
                      >
                        <div v-if="ImgLoading" class="d-flex center-in-img">
                          <v-progress-circular
                            class="mr-2"
                            indeterminate
                            color="primary"
                            :size="50"
                            :width="4"
                          ></v-progress-circular>
                        </div>
                        <div
                          v-else
                          class="d-flex iconBg darken-2 v-card--reveal white--text"
                          :class="{ 'on-hover': hover }"
                          style="height: 100%"
                        >
                          <v-icon large color="white">mdi-upload</v-icon>
                          <br />
                          <h2>Upload</h2>
                        </div>
                      </v-img>
                    </v-responsive>
                  </v-card>
                </v-hover>
                <input
                  ref="inputThumbnail"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFilePicked($event, id)"
                />
              </v-col>
              <v-col cols="12" sm="4" md="5">
                <v-text-field
                  v-model="name"
                  name="name"
                  label="Name"
                  counter
                  :disabled="loading"
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="price"
                  name="price"
                  label="Price"
                  hint="Number Only"
                  suffix="$"
                  :disabled="loading"
                  @keypress="isNumber($event)"
                ></v-text-field>
                <v-switch
                  v-model="publics"
                  class="ma-0"
                  label="Public"
                  :disabled="loading"
                ></v-switch>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            :disabled="loading"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            :disabled="$v.$invalid || loading"
            @click.prevent="submit(id)"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="primary"
              :size="15"
              :width="2"
            ></v-progress-circular>
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(255),
    },
  },
  data: () => ({
    dialog: false,
    data: null,
    id: '',
    name: '',
    price: '',
    publics: false,
    thumbnail: '',

    loading: false,
    ImgLoading: false,
  }),
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength &&
        errors.push('Name must be at least 4 characters long')
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 255 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
  },
  methods: {
    async open(id) {
      this.dialog = true
      const responseMovie = await this.$axios.$get(`/api/creator/movie/${id}`, {
        progress: false,
      })
      this.data = responseMovie
      this.id = responseMovie._id
      this.name = responseMovie.name
      this.price = responseMovie.price
      this.publics = responseMovie.public
      this.thumbnail = responseMovie.media.thumbnail
    },
    isNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault()
      }
    },
    async onFilePicked(e, id) {
      this.ImgLoading = true
      const imgFile = e.target.files[0]
      if (!this.checkFile(imgFile)) {
        alert('Allow jpeg,jpg,png,tiff,gif,bmp,webp Only!')
      } else if (imgFile) {
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
        if (response) {
          this.$emit('update', { id, data: response })
          this.ImgLoading = false
          this.thumbnail = response.media.thumbnail
        }
        // setTimeout(() => {
        //   this.thumbnail = URL.createObjectURL(imgFile)
        //   this.ImgLoading = false
        // }, 500)
      }
    },
    async submit(id) {
      this.loading = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const movie = {
          name: this.name,
          price: parseFloat(this.price),
          public: this.publics,
        }
        try {
          const responseUpdate = await this.$axios.$patch(
            `/api/creator/movie/${id}`,
            movie,
            { progress: false }
          )
          if (responseUpdate) {
            // update group price
            this.$store.commit('mystore/updateGroupPrice', {
              id: responseUpdate.group_id,
              cash: responseUpdate.price - this.data.price,
            })

            this.$emit('update', { id, data: responseUpdate })
            this.dialog = false
            this.loading = false
            this.clear()
          }
        } catch (error) {
          console.log(error)
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
    clear() {
      this.id = ''
      this.name = ''
      this.price = ''
      this.public = false
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
  position: absolute;
  width: 100%;
  border-radius: 5px;
  opacity: 0;
  transition: 0.3s;
}
.on-hover {
  opacity: 0.8;
  transition: 0.3s;
}
</style>
