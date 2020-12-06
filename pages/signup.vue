<template>
  <v-form action="#" class="custom-form sign-up-form" autocomplete="off">
    <h1 class="authTitle">Sign up</h1>
    <v-text-field
      v-model.trim="username"
      :error-messages="errorName.length === 0 ? usernameErrors : errorName"
      class="custom-auth-textfield"
      label="Username"
      filled
      rounded
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="errorEmail.length === 0 ? emailErrors : errorEmail"
      class="custom-auth-textfield"
      label="Email"
      filled
      rounded
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      class="custom-auth-textfield"
      type="password"
      label="Password"
      autocomplete="on"
      filled
      rounded
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="confirm"
      :error-messages="confirmErrors"
      class="custom-auth-textfield"
      type="password"
      label="Confirm Password"
      autocomplete="on"
      filled
      rounded
      required
      @input="$v.confirm.$touch()"
      @blur="$v.confirm.$touch()"
    ></v-text-field>
    <v-btn
      class="py-6 px-12 white--text"
      color="#5995fd"
      :disabled="
        $v.$invalid || errorEmail.length !== 0 || errorName.length !== 0
      "
      rounded
      depressed
      @click="submit"
    >
      Sign up
    </v-btn>
    <p class="social-text">Or Sign up with social platforms</p>
    <div class="social-media">
      <v-btn class="mx-2" color="dark" outlined fab depressed>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn class="mx-2" color="dark" outlined fab depressed>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn class="mx-2" color="dark" outlined fab depressed>
        <v-icon>mdi-google</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  sameAs,
} from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Z0-9]+$/)

export default {
  layout: 'auth',
  validate({ store }) {
    if (store.state.auth.loggedIn) return false
    else return true
  },
  mixins: [validationMixin],

  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(128),
      alpha,
    },
    email: {
      required,
      email,
    },
    password: { required, minLength: minLength(4), maxLength: maxLength(128) },
    confirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm: '',
      timeout: null,
      errorName: [],
      errorEmail: [],
    }
  },
  computed: {
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
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at least 4 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 128 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    confirmErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.confirm.sameAsPassword && errors.push('Password not match')
      !this.$v.password.required && errors.push('Please confirm password')
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
            this.errorName = res.data.isAvailable ? [] : ['Username is used']
          })
      }, 500)
    },
    email(val) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$axios
          .get(`/api/auth/email?search=${val}`, {
            progress: false,
          })
          .then((res) => {
            this.errorEmail = res.data.isAvailable ? [] : ['Email is used']
          })
      }, 500)
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (
        !this.$v.$invalid ||
        this.errorEmail.length === 0 ||
        this.errorName.length === 0
      ) {
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        }
        console.log(userData)
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>
