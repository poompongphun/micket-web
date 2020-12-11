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
    :absolute="$vuetify.breakpoint.smAndDown"
    :temporary="$vuetify.breakpoint.smAndDown"
  >
    <v-list dense nav class="py-0 mt-2">
      <v-list-item
        v-for="item in items"
        :key="item.title"
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
        { title: 'Store', icon: 'mdi-storefront', links: '/' },
        { title: 'Library', icon: 'mdi-filmstrip-box', links: '/library' },
        { title: 'Friends', icon: 'mdi-account-group', links: '/friends' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      items_bottom: [
        { title: 'Logout', icon: 'mdi-logout-variant' },
        { title: 'Setting', icon: 'mdi-cog' },
      ],
    }
  },
  computed: {
    variant() {
      return this.$vuetify.breakpoint.mdAndUp ? this.miniVariant : false
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    showDrawer() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.miniVariant = !this.miniVariant
        this.expandOnHover = !this.expandOnHover
      } else {
        this.forMobile = !this.forMobile
      }
    },
  },
}
</script>
