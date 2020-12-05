<template>
  <v-form action="#" class="custom-form sign-in-form" autocomplete="off">
    <h2 class="authTitle">Sign in</h2>
    <v-text-field
      v-model="username"
      type="email"
      class="custom-auth-textfield"
      name="email"
      label="Email"
      filled
      rounded
    ></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      class="custom-auth-textfield"
      name="password"
      label="Password"
      autocomplete="on"
      filled
      rounded
    ></v-text-field>
    <v-btn
      class="py-6 px-12 white--text"
      color="#5995fd"
      rounded
      depressed
      @click.stop="submitLogin(username, password)"
    >
      Login
    </v-btn>
    <p class="social-text">Or Sign in with social platforms</p>
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
export default {
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  validate({ store }) {
    if (store.state.auth.loggedIn) return false
    else return true
  },
  methods: {
    async submitLogin(user, pass) {
      try {
        const loginData = {
          email: user,
          password: pass,
        }
        await this.$auth.loginWith('local', {
          data: loginData,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
