<template>
  <v-app v-if="!loading" light>
    <v-app-bar color="navbar" app clipped-left flat>
      <v-app-bar-nav-icon @click.stop="showDrawer"></v-app-bar-nav-icon>

      <v-btn class="text-capitalize no-active" text rounded to="/">
        <v-img :src="require('~/assets/logo/Micket.svg')" width="50"></v-img>
        <v-toolbar-title
          v-if="!$vuetify.breakpoint.xsOnly"
          class="font-weight-bold ml-2"
        >
          Micket
        </v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$store.state.auth.loggedIn"
        class="no-active mr-1"
        color="iconBg"
        rounded
        depressed
        small
        to="/cart"
      >
        <v-icon left>mdi-cart-outline</v-icon>
        2
      </v-btn>

      <v-btn
        v-if="$store.state.auth.loggedIn"
        class="no-active"
        color="iconBg"
        rounded
        depressed
        small
        to="/wallet"
      >
        ${{ $store.getters.loggedInUser.coins }}
      </v-btn>

      <meProfile v-if="$store.state.auth.loggedIn" />

      <div v-else>
        <v-btn color="primary" to="/signin" rounded depressed>Sign In</v-btn>
        <v-btn color="primary" to="/signup" rounded depressed>Sign Up</v-btn>
      </div>
    </v-app-bar>

    <navDrawer ref="drawer" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar"
      class="px-3"
      :timeout="timeout"
      :color="`${alert.color}--text navbar`"
      left
    >
      <v-row>
        <v-icon left :color="alert.color">{{ alert.icon }}</v-icon>
        <span>{{ alert.text }}</span>
      </v-row>

      <template v-slot:action="{ attrs }">
        <v-btn
          depressed
          icon
          x-small
          v-bind="attrs"
          :color="alert.color"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import meProfile from '@/components/layoutItem/meProfile'
import navDrawer from '@/components/layoutItem/navDrawer'
export default {
  components: {
    meProfile,
    navDrawer,
  },
  data: () => ({
    loading: true,
    snackbar: false,
    timeout: 5000,
    alert: { color: '', text: '', icon: '' },
  }),
  watch: {
    '$store.state.alert'(val) {
      this.alert = val[0]
      this.snackbar = true
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.loading = false
      }, 500)
    })
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.showDrawer()
    },
  },
}
</script>
