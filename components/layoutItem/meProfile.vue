<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      offset-x
      min-width="280"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-avatar color="primary" size="35">
            <v-img
              :src="
                $store.getters.loggedInUser.profile ||
                require('~/assets/profile/MicketProfile.png')
              "
            />
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src="
                  $store.getters.loggedInUser.profile ||
                  require('~/assets/profile/MicketProfile.png')
                "
                :alt="$store.getters.loggedInUser.name"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                $store.getters.loggedInUser.name.toUpperCase()
              }}</v-list-item-title>
              <v-list-item-subtitle
                v-if="
                  $store.getters.loggedInUser.name !==
                  $store.getters.loggedInUser.username
                "
              >
                {{ $store.getters.loggedInUser.username }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="editProfile">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider v-if="$vuetify.breakpoint.mdAndUp"></v-divider>

        <v-row
          v-if="$vuetify.breakpoint.smAndDown"
          class="iconBg rounded-pill mx-2"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="4">
            <v-btn text block depressed small to="/wishlist">
              <v-icon left>mdi-clipboard-list-outline</v-icon>
              {{ $store.getters.loggedInUser.wishlist.length }}
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn text block depressed small to="/cart">
              <v-icon left>mdi-cart-outline</v-icon>
              {{ $store.state.cart.length }}
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn text block depressed small to="/wallet">
              <v-icon left>mdi-currency-usd-circle-outline</v-icon>
              ${{ $store.getters.loggedInUser.coins }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- <v-divider></v-divider> -->

        <v-list>
          <v-list-item @click="darkMode = !darkMode">
            <v-icon class="mr-3 iconBg pa-2 rounded-circle">
              mdi-theme-light-dark
            </v-icon>
            <v-list-item-title>Dark Mode</v-list-item-title>
            <v-switch
              v-model="darkMode"
              class="ma-0"
              color="primary"
              readonly
              dense
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item to="/setting">
            <v-icon class="mr-3 iconBg pa-2 rounded-circle"> mdi-cog </v-icon>
            <v-list-item-title>Setting</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-icon class="mr-3 iconBg pa-2 rounded-circle">
              mdi-logout-variant
            </v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <editProfile ref="editProfile" />
  </div>
</template>

<script>
import editProfile from '@/components/profile/editProfile'
export default {
  components: {
    editProfile,
  },
  data() {
    return {
      profileImg:
        'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png',
      // meName: this.$store.getters.loggedInUser.name,
      // meUsername: this.$store.getters.loggedInUser.username,
      darkMode: false,
    }
  },
  watch: {
    darkMode(val) {
      localStorage.darkMode = val
      this.$vuetify.theme.dark = val
    },
  },
  mounted() {
    if (localStorage.darkMode !== undefined)
      this.darkMode = localStorage.darkMode === 'true'
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    editProfile() {
      this.$refs.editProfile.openDialog()
    },
  },
}
</script>
