<template>
  <v-app v-if="loading" class="loading-page">
    <v-row v-if="loading" class="fill-height" justify="center" align="center">
      <div class="text-center navbar py-10 px-15 rounded-xl">
        <v-progress-circular
          :size="80"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <h2 class="pt-5 primary--text">Loading</h2>
      </div>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
