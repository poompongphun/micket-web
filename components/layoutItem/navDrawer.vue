<template>
  <v-navigation-drawer
    v-model="forMobile"
    app
    color="navbar"
    width="230"
    :clipped="$vuetify.breakpoint.mdAndUp"
    :floating="$vuetify.breakpoint.mdAndUp"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :mini-variant="variant"
    :fixed="$vuetify.breakpoint.smAndDown"
    :temporary="$vuetify.breakpoint.smAndDown"
  >
    <v-list dense nav class="py-0 mt-2">
      <v-list-item v-if="$vuetify.breakpoint.smAndDown">
        <v-app-bar-nav-icon @click.stop="showDrawer"></v-app-bar-nav-icon>
        <v-btn class="text-capitalize no-active" text rounded to="/">
          <v-img
            class="mr-2"
            :src="require('~/assets/logo/Micket.svg')"
            width="50"
          ></v-img>
          <v-toolbar-title class="font-weight-bold">Micket</v-toolbar-title>
        </v-btn>
      </v-list-item>
      <v-divider v-if="$vuetify.breakpoint.smAndDown" class="mb-3"></v-divider>

      <!-- <v-list-item
        v-if="$store.state.auth.loggedIn"
        v-show="$store.getters.loggedInUser.creator"
        color="primary"
        link
        to="/mystore"
      >
        <v-list-item-icon>
          <v-icon>mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>My Store</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item
        v-for="item in items"
        v-show="item.show"
        :key="item.title"
        color="primary"
        link
        :to="item.links"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- <template v-slot:append>
        <v-list dense nav class="py-0">
          <v-list-item
            v-for="item in items_bottom"
            :key="item.title"
            @click="logout"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template> -->
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      miniVariant: false,
      expandOnHover: true,
      forMobile: false,
      items: [
        { title: 'Store', icon: 'mdi-storefront', links: '/', show: true },
        {
          title: 'Library',
          icon: 'mdi-filmstrip-box',
          links: '/library',
          show: this.$store.state.auth.loggedIn,
        },
        {
          title: 'My Store',
          icon: 'mdi-briefcase',
          links: '/mystore',
          show:
            this.$store.state.auth.loggedIn &&
            this.$store.getters.loggedInUser.creator,
        },
        // { title: 'Friends', icon: 'mdi-account-group', links: '/friends' },
        // { title: 'About', icon: 'mdi-help-box' },
      ],
      // items_bottom: [
      //   { title: 'Logout', icon: 'mdi-logout-variant' },
      //   { title: 'Setting', icon: 'mdi-cog' },
      // ],
    }
  },
  computed: {
    variant() {
      return this.$vuetify.breakpoint.mdAndUp ? this.miniVariant : false
    },
  },
  created() {
    if (localStorage.drawerMini !== undefined) {
      this.miniVariant = localStorage.drawerMini === 'true'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    showDrawer() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        const value = !this.miniVariant
        localStorage.drawerMini = value
        this.miniVariant = value
        this.expandOnHover = !this.expandOnHover
      } else {
        this.forMobile = !this.forMobile
      }
    },
  },
}
</script>
