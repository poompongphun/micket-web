<template>
  <v-app v-if="!loading" light>
    <v-app-bar color="navbar" app clipped-left flat>
      <v-app-bar-nav-icon @click.stop="showDrawer"></v-app-bar-nav-icon>

      <v-btn class="text-capitalize no-active px-2" text rounded to="/">
        <v-img :src="require('~/assets/logo/Micket.svg')" width="30"></v-img>
        <v-toolbar-title class="font-weight-bold ml-1">
          Micket
        </v-toolbar-title>
      </v-btn>

      <search />

      <v-btn-toggle
        v-if="$store.state.auth.loggedIn && $vuetify.breakpoint.mdAndUp"
        rounded
      >
        <v-btn class="no-active" color="iconBg" depressed small to="/wishlist">
          <v-icon left>mdi-clipboard-list-outline</v-icon>
          {{ $store.getters.loggedInUser.wishlist.length }}
        </v-btn>
        <v-btn class="no-active" color="iconBg" depressed small to="/cart">
          <v-icon left>mdi-cart-outline</v-icon>
          {{ $store.state.cart.length }}
        </v-btn>
        <v-btn class="no-active" depressed outlined small to="/wallet">
          ${{ $store.getters.loggedInUser.coins }}
        </v-btn>
      </v-btn-toggle>

      <meProfile v-if="$store.state.auth.loggedIn" />

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp && !$store.state.auth.loggedIn"
        color="primary"
        to="/signin"
        rounded
        depressed
      >
        <v-icon left>mdi-login</v-icon>
        Sign In
      </v-btn>
      <v-btn
        v-else-if="!$store.state.auth.loggedIn"
        color="primary"
        icon
        to="/signin"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp && !$store.state.auth.loggedIn"
        color="primary"
        to="/signup"
        rounded
        depressed
      >
        <v-icon left>mdi-account-plus-outline</v-icon>
        Sign Up
      </v-btn>
      <v-btn
        v-else-if="!$store.state.auth.loggedIn"
        color="primary"
        icon
        to="/signup"
      >
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
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
    <haveAccountDialog
      v-if="!$store.state.auth.loggedIn"
      v-model="haveAccount"
    />
  </v-app>
</template>

<script>
import meProfile from '@/components/layoutItem/meProfile'
import navDrawer from '@/components/layoutItem/navDrawer'
import search from '@/components/layoutItem/search'
import haveAccountDialog from '@/components/items/haveAccountDialog'
export default {
  components: {
    meProfile,
    navDrawer,
    search,
    haveAccountDialog,
  },
  data: () => ({
    loading: true,
    snackbar: false,
    timeout: 5000,
    alert: { color: '', text: '', icon: '' },
  }),
  computed: {
    haveAccount: {
      get() {
        return this.$store.getters.haveAccount
      },
      set(value) {
        this.$store.commit('sethaveAccount', false)
      },
    },
  },
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
