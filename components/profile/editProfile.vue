<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="500"
      scrollable
      :fullscreen="this.$vuetify.breakpoint.xsOnly"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>Edit Profile</v-card-title>
        <v-btn class="mt-3" icon absolute right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-divider></v-divider>
        <div class="text-center">
          <v-img
            src="https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg"
            lazy-src="https://www.zw3dthailand.com/wp-content/uploads/2017/02/background-bg.jpg"
            :aspect-ratio="16 / 5"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-avatar class="user-avatar" size="100" color="iconBg">
            <img
              src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
              alt="alt"
            />
          </v-avatar>
        </div>
        <v-card-text class="mt-15">
          <v-text-field
            v-model.trim="editData.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model.trim="editData.username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model.trim="editData.email"
            label="Email"
            required
          ></v-text-field>
          <v-card class="pa-3">
            <v-row class="px-3" align="center">
              <span>Change Password ?</span>
              <v-spacer></v-spacer>
              <v-btn
                class="text-capitalize"
                icon
                text
                small
                @click="isChangePass = !isChangePass"
              >
                <v-icon v-if="isChangePass" color="primary">mdi-minus</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
              </v-btn>
            </v-row>
            <v-expand-transition>
              <div v-show="isChangePass">
                <v-text-field
                  v-model.trim="editData.password"
                  label="Password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="editData.password"
                  label="New Password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="editData.password"
                  label="Confirm Password"
                  required
                ></v-text-field>
              </div>
            </v-expand-transition>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text>Cancel</v-btn>
          <v-btn color="primary" text>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    editData: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    isChangePass: false,
  }),
  methods: {
    openDialog() {
      this.dialog = true
      this.editData.name = this.$store.getters.loggedInUser.name
      this.editData.username = this.$store.getters.loggedInUser.username
      this.editData.email = this.$store.getters.loggedInUser.email
      this.editData.password = this.$store.getters.loggedInUser.password
    },
  },
}
</script>

<style lang="scss">
.user-avatar {
  position: absolute !important;
  left: 20px;
  margin-top: -40px;
  border: 3px solid rgba(255, 255, 255, 0);
}
</style>
