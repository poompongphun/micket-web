<template>
  <div>
    <expandSetting title="Creator">
      <template v-slot:head>
        <v-chip
          v-if="$store.getters.loggedInUser.creator"
          class="mx-3"
          color="success--text"
        >
          You are Creator
        </v-chip>
      </template>
      <template v-slot:setting>
        <div class="pa-3">
          <v-row no-gutters justify="center" align="center">
            <v-col> Become movie Creator ${{ price }}/Month </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right">
              <v-btn
                v-if="!$store.getters.loggedInUser.creator"
                color="success"
                outlined
                @click="beComeCreator"
              >
                Join
              </v-btn>
              <v-btn v-else color="red" outlined @click="cancelCreator">
                Cancel
              </v-btn>
            </v-col>
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
    price: 0,
  }),
  async mounted() {
    const response = await this.$axios.get('/api/creator/join/price')
    this.price = response.data.price
  },
  methods: {
    async beComeCreator() {
      await this.$store.dispatch('beCreator', { join: true, price: this.price })
    },
    async cancelCreator() {
      await this.$store.dispatch('beCreator', {
        join: false,
        price: this.price,
      })
    },
  },
}
</script>
