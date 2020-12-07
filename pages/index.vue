<template>
  <div>
    <v-btn color="success" to="/signin">Login Page</v-btn>
    <v-btn color="success" @click="logout">logout</v-btn>
    Hello {{ $store.getters.loggedInUser.name }}
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
