<template>
  <v-menu
    :close-on-content-click="false"
    offset-x
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on">
        <v-avatar color="primary" size="35">
          <v-img :src="profileImg" />
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="profileImg" :alt="meName" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ meName.toUpperCase() }}</v-list-item-title>
            <v-list-item-subtitle>Hello, I'm {{ meName }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

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

      <v-card-actions>
        <!-- <v-spacer></v-spacer>

        <v-btn text @click="menu = false"> Cancel </v-btn>
        <v-btn color="primary" text @click="menu = false"> Save </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      profileImg:
        'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png',
      meName: this.$store.getters.loggedInUser.name,

      darkMode: false,
    }
  },
  watch: {
    darkMode(val) {
      this.$vuetify.theme.dark = val
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
