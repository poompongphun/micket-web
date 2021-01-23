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
                  :error-messages="mailError"
                  class="my-2"
                  name="email"
                  label="Email"
                  filled
                  dense
                  persistent-hint
                  single-line
                  hint="Please enter your email to find your account."
                  rounded
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="dialog = false"> Cancel </v-btn>
              <v-btn color="primary" @click="sendMail({ email })">
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="elevation-0" height="140">
              <h3 class="pb-1">Check code in your mail</h3>
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
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="step = 1"> Cancel </v-btn>
              <v-btn color="primary" @click="checkCode({ email, code })">
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
                  class="my-2"
                  name="password"
                  label="New Password"
                  filled
                  dense
                  persistent-hint
                  hint="Choose a new password"
                  single-line
                  rounded
                ></v-text-field>
              </div>
            </v-card>

            <div class="float-right">
              <v-btn text @click="step = 2"> Cancel </v-btn>
              <v-btn
                color="primary"
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
export default {
  data: () => ({
    dialog: false,
    step: 1,
    email: '',
    code: '',
    newPassword: '',

    mailError: '',
    codeError: '',
  }),
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
    success() {
      this.dialog = false
      this.step = 1
      this.email = ''
      this.code = ''
      this.newPassword = ''
      this.mailError = ''
      this.codeError = ''
    },
  },
}
</script>
