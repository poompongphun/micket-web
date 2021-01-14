<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
      scrollable
      max-width="400px"
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="headline">
          Owned Users
          <v-chip class="mx-2" small>{{ users.length }}</v-chip>
          <v-btn icon absolute right @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-2">
          <div v-if="users.length !== 0">
            <v-row v-for="user in users" :key="user._id" dense align="center">
              <v-col cols="2">
                <v-avatar color="primary" size="35">
                  <v-img
                    src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="8" class="text-truncate">
                {{ user.name }}
              </v-col>
              <v-col cols="2" class="text-right">
                <v-btn color="error" icon @click="refund(user._id)">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else class="text-center">No one owned this movie</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    movieId: '',
    users: [],
  }),
  methods: {
    async open(id) {
      try {
        const responseUser = await this.$axios.$get(
          `/api/creator/movie/${id}/users`,
          {
            progress: false,
          }
        )
        this.movieId = id
        this.users = responseUser.purchase_user
        this.dialog = true
      } catch (error) {
        this.$store.commit('setAlert', {
          color: 'error',
          text: error.response.data,
          icon: 'mdi-alert',
        })
      }
    },
    async refund(id) {
      try {
        const responseUser = await this.$axios.$delete(
          `/api/creator/movie/${this.movieId}/users/${id}`,
          {
            progress: false,
          }
        )
        if (responseUser) {
          const index = this.users.findIndex((user) => user._id === id)
          this.users.splice(index, 1)
        }
      } catch (error) {
        this.$store.commit('setAlert', {
          color: 'error',
          text: error.response.data,
          icon: 'mdi-alert',
        })
      }
    },
  },
}
</script>
