<template>
  <div>
    <v-btn color="success" to="/signin">Login Page</v-btn>
    <v-btn color="success" @click="logout">logout</v-btn>
    <div v-if="this.$store.state.auth.loggedIn">
      Hello {{ $store.getters.loggedInUser.name }}
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
