<template>
  <v-dialog v-model="dialog" width="600" scrollable persistent>
    <v-stepper v-model="step">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="step > 1" step="1">Find</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Code</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Reset</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">Success</v-stepper-step>
      </v-stepper-header>

      <v-divider></v-divider>

      <v-form action="#" autocomplete="off">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="elevation-0" height="140">
              <h3 class="pb-1">Find your account</h3>
              <v-divider></v-divider>
              <div class="py-3">
                <v-text-field
                  v-model="email"
                  :error-messages="mailError === '' ? emailErrors : mailError"
                  class="my-2"
                  name="email"
                  label="Email"
                  filled
                  dense
                  persistent-hint
                  single-line
                  hint="Please enter your email to find your account."
                  rounded
                  @keypress="mailError = ''"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="success()"> Cancel </v-btn>
              <v-btn
                color="primary"
                :disabled="emailErrors.length !== 0 || email === ''"
                @click="sendMail({ email })"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="elevation-0" height="140">
              <h3 class="pb-1">
                Check code in your mail
                <v-chip small>{{ email }}</v-chip>
              </h3>
              <v-divider></v-divider>
              <div class="py-3">
                <v-text-field
                  v-model="code"
                  :error-messages="codeError"
                  class="my-2"
                  name="code"
                  label="Code"
                  filled
                  dense
                  persistent-hint
                  single-line
                  hint="Please check the code in your email. Your code is a 6-digit number."
                  rounded
                  @keypress="isCode($event, code)"
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="success()"> Cancel </v-btn>
              <v-btn
                color="primary"
                :disabled="code === ''"
                @click="checkCode({ email, code })"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="elevation-0" height="140">
              <h3 class="pb-1">Choose a new password</h3>
              <v-divider></v-divider>
              <div class="py-3">
                <v-text-field
                  v-model="newPassword"
                  :error-messages="passwordErrors"
                  class="my-2"
                  name="password"
                  label="New Password"
                  filled
                  dense
                  persistent-hint
                  hint="Choose a new password"
                  single-line
                  rounded
                  @input="$v.newPassword.$touch()"
                  @blur="$v.newPassword.$touch()"
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="success()"> Cancel </v-btn>
              <v-btn
                color="primary"
                :disabled="passwordErrors.length !== 0"
                @click="changePassword({ email, code, newPassword })"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="elevation-0" height="140">
              <v-row
                class="fill-height"
                align="center"
                justify="center"
                no-gutters
              >
                <v-col cols="12" class="text-center">
                  <v-icon color="success" size="70">mdi-check-circle</v-icon>
                  <br />
                  <span>Success</span>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn class="my-2" color="primary" @click="success()">
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-form>
    </v-stepper>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email,
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(128),
    },
  },
  data: () => ({
    dialog: false,
    step: 1,
    email: '',
    code: '',
    newPassword: '',

    mailError: '',
    codeError: '',
  }),
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.minLength &&
        errors.push('Password must be at least 6 characters long')
      !this.$v.newPassword.maxLength &&
        errors.push('Password must be at most 128 characters long')
      !this.$v.newPassword.required && errors.push('Password is required')
      return errors
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    async sendMail(value) {
      try {
        const mail = await this.$axios.$post(
          '/api/auth/forgot',
          {
            email: value.email,
          },
          { progress: false }
        )
        if (mail) {
          this.step = 2
        }
      } catch (error) {
        this.mailError = 'Not found your account'
      }
    },
    async checkCode(value) {
      try {
        const code = await this.$axios.$post(
          '/api/auth/forgot/code',
          {
            email: value.email,
            code: value.code,
          },
          { progress: false }
        )
        if (code.code) {
          this.step = 3
        }
      } catch (error) {
        this.codeError = 'Wrong code'
        this.code = ''
      }
    },
    async changePassword(value) {
      try {
        const password = await this.$axios.$post(
          '/api/auth/forgot/password',
          {
            email: value.email,
            code: value.code,
            newPassword: value.newPassword,
          },
          { progress: false }
        )
        if (password) {
          this.step = 4
        }
      } catch (error) {
        this.$store.commit('setAlert', {
          color: 'error',
          text: error.response.data,
          icon: 'mdi-alert',
        })
      }
    },
    isCode($event, code) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (
        ((keyCode < 48 || keyCode > 57) && keyCode !== 46) ||
        code.length === 6
      ) {
        $event.preventDefault()
      }
    },
    success() {
      this.dialog = false
      this.step = 1
      this.email = ''
      this.code = ''
      this.newPassword = ''
      this.mailError = ''
      this.codeError = ''
      this.$v.$reset()
    },
  },
}
</script>
