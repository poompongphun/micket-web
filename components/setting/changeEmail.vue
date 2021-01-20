<template>
  <div>
    <expandSetting title="Email">
      <template v-slot:head>
        <v-chip v-if="$store.getters.loggedInUser.creator" class="mx-3">
          {{ $store.getters.loggedInUser.email }}
        </v-chip>
      </template>
      <template v-slot:setting>
        <div class="pa-3">
          <v-row justify="center" align="center" no-gutters>
            <v-text-field
              v-model="email"
              name="email"
              class="mr-2"
              :disabled="disable"
              filled
              rounded
              dense
              hide-details
            >
            </v-text-field>
            <v-btn
              v-if="disable"
              class="mx"
              color="warning white--text"
              rounded
              depressed
              @click="disable = false"
            >
              Change
            </v-btn>
            <v-btn
              v-else
              class="mx"
              color="primary white--text"
              rounded
              depressed
              @click="disable = true"
            >
              Save
            </v-btn>
          </v-row>
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
    email: '',
    disable: true,
  }),
  mounted() {
    this.email = this.$store.getters.loggedInUser.email
  },
}
</script>
