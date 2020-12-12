<template>
  <div>
    <h1 class="pa-10 text-center">฿{{ toFixed(money) }}</h1>
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
                  v-model="moneyText"
                  name="money"
                  class="text-center center-input"
                  prefix="฿"
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
                    ฿{{ toFixed(money) }}
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card class="elevation-0" :disabled="moneyText === ''">
          <div ref="paypal"></div>
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

  data: () => ({
    money: 0,
    banks: [100, 200, 300, 500, 750, 1000, 1500, 2000],
    loaded: false,
    paidFor: false,
    moneyText: '',
    // product: {
    //   price: 777.77,
    //   description: 'leg lamp from that one movie',
    //   img: './assets/lamp.jpg',
    // },
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
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `Add ${this.moneyText} baht to Wallet`,
                  amount: {
                    currency_code: 'USD',
                    value: parseFloat(this.moneyText),
                  },
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.paidFor = true
            console.log(order)
            this.money += parseFloat(
              order.purchase_units.reduce(
                (total, unit) => total + unit.amount.value,
                0
              )
            )
          },
          onError: (err) => {
            console.log(err)
          },
        })
        .render(this.$refs.paypal)
    },
    toFixed(num) {
      const number = num.toFixed(2)
      return number
    },
    addMoney(money) {
      this.moneyText = money
    },
  },
}
</script>
