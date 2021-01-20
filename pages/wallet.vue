<template>
  <div>
    <h1 class="pa-10 text-center">${{ $store.getters.loggedInUser.coins }}</h1>
    <v-row justify="center" align="start">
      <v-col cols="12" sm="9">
        <v-card>
          <v-card-text>
            <div class="text-center">
              <h2>How much would you like to add</h2>
              <div
                :style="`padding: 0 ${
                  $vuetify.breakpoint.mdAndUp ? '40%' : '30%'
                }`"
              >
                <v-text-field
                  v-model="moneyAdd.money"
                  name="money"
                  class="text-center center-input"
                  prefix="$"
                  readonly
                ></v-text-field>
              </div>
            </div>
            <div :class="{ 'px-15': $vuetify.breakpoint.mdAndUp }">
              <v-row justify="center" align="center">
                <v-col
                  v-for="money in banks"
                  :key="money"
                  cols="4"
                  sm="3"
                  class="text-center"
                >
                  <v-btn
                    color="primary"
                    depressed
                    outlined
                    rounded
                    @click="addMoney(money)"
                  >
                    ${{ money }}
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="elevation-0" :disabled="moneyAdd.money === ''">
          <div id="paypal-button" ref="paypal"></div>
          <div v-if="paidFor">
            <h1>Sccessfully!</h1>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  validate({ store }) {
    return store.state.auth.loggedIn
  },
  data: () => ({
    // money: this.$store.getters.loggedInUser.coins,
    banks: [100, 200, 300, 500, 750, 1000, 1500, 2000],
    loaded: false,
    paidFor: false,
    moneyAdd: {
      money: '',
      currency: 'USD',
    },
  }),
  mounted() {
    const script = document.createElement('script')
    script.src = process.env.PAYPAL_CLIENT_ID
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  methods: {
    setLoaded() {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: async (data, actions) => {
            const response = await this.$axios.post(
              '/api/wallet/add/',
              this.moneyAdd
            )
            return response.data.token
          },
          onApprove: async (data, actions) => {
            const response = await this.$axios.post(
              '/api/wallet/add/execute/',
              {
                paymentID: data.paymentID,
                payerID: data.payerID,
                money: this.moneyAdd,
              }
            )
            if (response.data.status === 'success') {
              const money = parseFloat(
                response.data.order.reduce(
                  (total, unit) => total + unit.amount.total,
                  0
                )
              )
              this.$store.commit('addCoins', money)
              this.paidFor = true
            }
          },
          onError: (error) => {
            alert(error)
          },
        })
        .render(this.$refs.paypal)
    },
    addMoney(money) {
      this.moneyAdd.money = money
    },
  },
}
</script>
