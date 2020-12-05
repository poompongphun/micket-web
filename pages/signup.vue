<template>
  <v-form action="#" class="custom-form sign-up-form" autocomplete="off">
    <h1 class="authTitle">Sign up</h1>
    <v-text-field
      class="custom-auth-textfield"
      name="username"
      label="Username"
      filled
      rounded
    ></v-text-field>
    <v-text-field
      class="custom-auth-textfield"
      name="email"
      label="Email"
      filled
      rounded
    ></v-text-field>
    <v-text-field
      class="custom-auth-textfield"
      name="password"
      label="Password"
      filled
      rounded
    ></v-text-field>
    <v-btn class="py-6 px-12 white--text" color="#5995fd" rounded depressed>
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
export default {
  layout: 'auth',
  validate({ store }) {
    if (store.state.auth.loggedIn) return false
    else return true
  },
}
</script>
