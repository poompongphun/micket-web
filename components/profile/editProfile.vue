<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="500"
      scrollable
      :persistent="loading"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>Edit Profile</v-card-title>
        <v-btn
          class="mt-3"
          :disabled="loading"
          icon
          absolute
          right
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <div class="text-center">
          <v-img
            src="https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"
            lazy-src="https://www.zw3dthailand.com/wp-content/uploads/2017/02/background-bg.jpg"
            :aspect-ratio="16 / 5"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <avatar class="user-avatar" />
        </div>
        <v-card-text class="mt-15">
          <v-form action="#" autocomplete="off">
            <v-text-field
              v-model.trim="name"
              :disabled="loading"
              :error-messages="nameErrors"
              name="name"
              label="Name"
              counter
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model.trim="username"
              :disabled="loading"
              :error-messages="
                errorName.length === 0 ? usernameErrors : errorName
              "
              name="username"
              label="Username"
              counter
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            <v-textarea
              v-model.trim="description"
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
            <!-- <v-text-field
              v-model.trim="editData.email"
              label="Email"
              required
            ></v-text-field>
            <v-card class="pa-3">
              <v-row class="px-3" align="center">
                <span>Change Password ?</span>
                <v-spacer></v-spacer>
                <v-btn
                  class="text-capitalize"
                  icon
                  text
                  small
                  @click="isChangePass = !isChangePass"
                >
                  <v-icon v-if="isChangePass" color="primary">mdi-minus</v-icon>
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
              </v-row>
              <v-expand-transition>
                <div v-show="isChangePass">
                  <v-text-field
                    v-model.trim="editData.password"
                    label="Password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="editData.password"
                    label="New Password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="editData.password"
                    label="Confirm Password"
                    required
                  ></v-text-field>
                </div>
              </v-expand-transition>
            </v-card> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            text
            :disabled="$v.$invalid || errorName.length !== 0 || loading"
            @click="saveProfile({ name, username, description })"
          >
            <v-progress-circular
              v-show="loading"
              class="mr-2"
              indeterminate
              color="primary"
              :size="15"
              :width="2"
            ></v-progress-circular>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import avatar from '@/components/profile/avatar'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Z0-9]+$/)

export default {
  components: {
    avatar,
  },
  mixins: [validationMixin],

  validations: {
    name: {
      minLength: minLength(4),
      maxLength: maxLength(128),
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
      alpha,
    },
    description: {
      maxLength: maxLength(1024),
    },
  },
  data: () => ({
    dialog: false,

    name: '',
    username: '',
    description: '',
    loading: false,

    timeout: null,
    errorName: [],
    // email: '',
    // password: '',

    // isChangePass: false,
  }),
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength &&
        errors.push('Name must be at least 4 characters long')
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 128 characters long')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength &&
        errors.push('Username must be at least 4 characters long')
      !this.$v.username.maxLength &&
        errors.push('Username must be at most 128 characters long')
      !this.$v.username.alpha &&
        errors.push('Username must be a-z, A-Z, 0-9 only')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength &&
        errors.push('Description must be at most 1024 characters long')
      return errors
    },
  },
  watch: {
    username(val) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$axios
          .get(`/api/auth/username?search=${val}`, {
            progress: false,
          })
          .then((res) => {
            if (this.username !== this.$store.getters.loggedInUser.username)
              this.errorName = res.data.isAvailable ? [] : ['Username is used']
            else this.errorName = []
          })
          .catch((error) => alert(error))
      }, 250)
    },
  },
  methods: {
    openDialog() {
      this.dialog = true
      this.name = this.$store.getters.loggedInUser.name
      this.username = this.$store.getters.loggedInUser.username
      this.description = this.$store.getters.loggedInUser.description
      // this.editData.email = this.$store.getters.loggedInUser.email
      // this.editData.password = this.$store.getters.loggedInUser.password
    },
    async saveProfile(value) {
      this.loading = true
      this.$v.$touch()
      if (!this.$v.$invalid || this.errorName.length === 0) {
        const sendData = {
          name: value.name,
          username: value.username,
          description: value.description,
        }
        const response = await this.$store.dispatch('updateMyInfo', sendData)
        if (response) {
          this.dialog = false
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.user-avatar {
  position: absolute !important;
  left: 20px;
  margin-top: -40px;
  border: 3px solid rgba(255, 255, 255, 0);
}
</style>
