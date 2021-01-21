<template>
  <div>
    <expandSetting ref="expandSetting" title="Password">
      <template v-slot:setting>
        <div class="pa-3">
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>Password : </span>
            <v-text-field
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              :disabled="loading"
              name="password"
              class="ml-2"
              filled
              rounded
              dense
              hide-details
            >
            </v-text-field>
          </v-row>
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>New Password : </span>
            <v-text-field
              v-model="newPassword"
              :type="showPass ? 'text' : 'password'"
              :error-messages="newPasswordErrors"
              :disabled="loading"
              name="newPassword"
              class="ml-2"
              filled
              rounded
              dense
              :hide-details="newPasswordErrors.length === 0"
              @input="$v.newPassword.$touch()"
              @blur="$v.newPassword.$touch()"
            >
            </v-text-field>
          </v-row>
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>Confirm Password : </span>
            <v-text-field
              v-model="confirmPassword"
              :type="showPass ? 'text' : 'password'"
              :error-messages="confirmPasswordErrors"
              :disabled="loading"
              name="confirmPassword"
              class="ml-2"
              filled
              rounded
              dense
              :hide-details="confirmPasswordErrors.length === 0"
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
            >
            </v-text-field>
          </v-row>
          <v-card-actions class="py-1 px-0">
            <v-alert
              v-show="alertError && !loading"
              v-model="alertError"
              width="100%"
              class="ma-0 mr-2"
              type="error"
              dense
              dismissible
              rounded
              text
              transition="scroll-y-transition"
            >
              {{ errors }}
            </v-alert>
            <v-spacer></v-spacer>
            <v-btn rounded depressed @click="showPass = !showPass">
              <v-icon v-if="showPass" left>mdi-eye</v-icon>
              <v-icon v-else left>mdi-eye-off</v-icon>
              Password
            </v-btn>
            <v-btn
              color="success"
              :disabled="$v.$invalid || loading"
              rounded
              depressed
              @click="changePassword(password, newPassword)"
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
        </div>
      </template>
    </expandSetting>
  </div>
</template>

<script>
import expandSetting from '@/components/setting/expandSetting'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from 'vuelidate/lib/validators'

export default {
  components: {
    expandSetting,
  },
  mixins: [validationMixin],
  validations: {
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(128),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('newPassword'),
    },
  },
  data: () => ({
    password: '',
    newPassword: '',
    confirmPassword: '',
    showPass: false,

    loading: false,

    alertError: false,
    errors: '',
  }),
  computed: {
    newPasswordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.minLength &&
        errors.push('Password must be at least 6 characters long')
      !this.$v.newPassword.maxLength &&
        errors.push('Password must be at most 128 characters long')
      !this.$v.newPassword.required && errors.push('Password is required')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push('Password not match')
      !this.$v.confirmPassword.required &&
        errors.push('Please confirm password')
      return errors
    },
  },
  methods: {
    async changePassword(password, newPassword) {
      this.loading = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          const sendPass = { password, newPassword }
          const response = await this.$axios.$post(
            '/api/users/me/password',
            sendPass,
            {
              progress: false,
            }
          )
          if (response) {
            this.loading = false
            this.$store.commit('setAlert', {
              color: 'success',
              text: 'Changed Password',
              icon: 'mdi-checkbox-marked-circle',
            })
            this.reset()
          }
        } catch (error) {
          this.errors = error.response.data
          this.alertError = true
          this.loading = false
        }
      }
    },
    reset() {
      this.password = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.errors = ''
      this.alertError = false
      this.$v.$reset()
      this.$refs.expandSetting.expand(false)
    },
  },
}
</script>
