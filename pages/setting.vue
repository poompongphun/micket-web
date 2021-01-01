<template>
  <div>
    <h2>Setting</h2>
    <h4>Become Movie Creator</h4>
    <v-btn
      v-if="!$store.getters.loggedInUser.creator"
      color="success"
      outlined
      @click="beComeCreator"
    >
      Become seller ${{ price }}/Month
    </v-btn>
    <v-btn v-else color="red" outlined @click="cancelCreator"> Cancel </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    price: 0,
  }),
  async mounted() {
    const response = await this.$axios.get('/api/creator/join/price')
    this.price = response.data.price
  },
  methods: {
    async beComeCreator() {
      const response = await this.$axios.post('/api/creator/join')
      this.$store.getters.loggedInUser.creator = response.data.message.creator
      this.$store.commit('useCoins', this.price)
    },
    async cancelCreator() {
      const response = await this.$axios.delete('/api/creator/join')
      this.$store.getters.loggedInUser.creator = response.data.message.creator
    },
  },
}
</script>
