<template>
  <div style="width: 100%">
    <v-text-field
      v-if="$vuetify.breakpoint.smAndUp"
      v-model="search"
      name="search"
      label="Search"
      class="mx-5"
      block
      filled
      rounded
      dense
      hide-details
      single-line
      append-icon="mdi-magnify"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="onEnter"
    ></v-text-field>
    <v-btn v-else class="float-right" color="primary" icon to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
  }),
  mounted() {
    if (this.$route.query.search) this.search = this.$route.query.search
  },
  methods: {
    onBlur() {
      console.log('blur')
      //   this.$router.back()
    },
    onFocus() {
      console.log('focus')
      //   this.$router.push('/search')
    },
    onEnter() {
      if (this.search !== '') {
        if (this.$route.query.search) {
          console.log('hi')
          this.$router.push({ path: 'search', query: { search: this.search } })
        } else this.$router.push(`/search?search=${this.search}`)
      }
    },
  },
}
</script>
