<template>
  <div
    :style="`z-index: 1;
          position: absolute;
          height: 100%;
          width: 100%;
          background: rgba(${
            $vuetify.theme.dark ? '0, 0, 0,' : '255, 255, 255,'
          } 0.7);`"
  >
    <v-row class="fill-height pa-1" justify="center" align="center" no-gutters>
      <div class="text-center">
        <div class="pa-2 rounded iconBg elevation-5">
          <h4 class="normalText--text">Don't have an account yet?</h4>
          <v-btn color="primary" rounded depressed to="/signup">
            Sign Up
          </v-btn>
        </div>
        <h4 class="normalText--text pa-3">OR</h4>
        <div class="pa-2 rounded iconBg elevation-5">
          <span class="normalText--text">Already have an account?</span>
          <br />
          <v-btn color="primary" rounded depressed text to="/signin">
            Sign In
          </v-btn>
        </div>
      </div>
    </v-row>
  </div>
</template>
