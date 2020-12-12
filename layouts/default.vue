<template>
  <v-app light style="font-family: 'Poppins', sans-serif">
    <v-app-bar color="navbar" app clipped-left flat>
      <v-app-bar-nav-icon @click.stop="showDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Micket</v-toolbar-title>

      <v-spacer></v-spacer>

      <meProfile v-if="this.$store.state.auth.loggedIn" />

      <div v-else>
        <v-btn color="primary" to="/signin" rounded depressed>Sign In</v-btn>
        <v-btn color="primary" to="/signup" rounded depressed>Sign Up</v-btn>
      </div>
      <!-- <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    <navDrawer ref="drawer" />

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

    <v-main v-else>
      <v-container fluid>
        <nuxt />
      </v-container>
      <!-- <v-footer padless>
        <v-col class="text-center navbar" cols="12">
          {{ new Date().getFullYear() }} — <strong>Micket</strong>
        </v-col>
      </v-footer> -->
    </v-main>
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
  }),
  beforeMount() {
    const readyHandler = () => {
      if (document.readyState === 'complete') {
        this.loading = false
        document.removeEventListener('readystatechange', readyHandler)
      }
    }

    document.addEventListener('readystatechange', readyHandler)

    readyHandler() // in case the component has been instantiated lately after loading
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.showDrawer()
    },
  },
}
</script>
