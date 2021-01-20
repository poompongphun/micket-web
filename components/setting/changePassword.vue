<template>
  <div>
    <expandSetting title="Password">
      <template v-slot:setting>
        <div class="pa-3">
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>Password : </span>
            <v-text-field
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              name="password"
              class="ml-2"
              filled
              rounded
              dense
              hide-details
            >
            </v-text-field>
          </v-row>
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>New Password : </span>
            <v-text-field
              v-model="newPassword"
              :type="showPass ? 'text' : 'password'"
              name="newPassword"
              class="ml-2"
              filled
              rounded
              dense
              hide-details
            >
            </v-text-field>
          </v-row>
          <v-row class="mb-1" justify="center" align="center" no-gutters>
            <span>Confirm Password : </span>
            <v-text-field
              v-model="confirmPassword"
              :type="showPass ? 'text' : 'password'"
              name="confirmPassword"
              class="ml-2"
              filled
              rounded
              dense
              hide-details
            >
            </v-text-field>
          </v-row>
          <v-card-actions class="py-1 px-0">
            <v-spacer></v-spacer>
            <v-btn rounded depressed @click="showPass = !showPass">
              <v-icon v-if="showPass" left>mdi-eye</v-icon>
              <v-icon v-else left>mdi-eye-off</v-icon>
              Password
            </v-btn>
            <v-btn color="success" rounded depressed>Save</v-btn>
          </v-card-actions>
        </div>
      </template>
    </expandSetting>
  </div>
</template>

<script>
import expandSetting from '@/components/setting/expandSetting'
export default {
  components: {
    expandSetting,
  },
  data: () => ({
    password: '',
    newPassword: '',
    confirmPassword: '',
    showPass: false,
  }),
}
</script>
