<template>
  <div>
    <div v-if="bills.length !== 0">
      <v-row dense>
        <v-col cols="12" md="12">
          <v-card class="pa-2">
            <h1>History</h1>
          </v-card>
        </v-col>
        <v-col v-for="bill in bills" :key="bill._id" cols="12">
          <div v-if="bill.order.length !== 0">
            <bills :bill="bill" />
          </div>
          <div v-else>
            <v-card>
              <v-row no-gutters>
                <v-col cols="3" sm="3" lg="2" align-self="center">
                  <v-card class="elevation-0">
                    <v-img
                      :src="bill.order_group.poster.x"
                      width="100%"
                    ></v-img>
                  </v-card>
                </v-col>
                <v-col cols="9" sm="9" lg="10" class="px-2 py-1">
                  <h3 class="primary--text px-1">
                    {{ bill.order_group.title }}
                  </h3>
                  <span class="grey--text">{{ bill.create_date }}</span>
                </v-col>
              </v-row>
              <div class="pack-icon iconBg pa-2 primary--text">PACKED</div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>

    <div v-else class="center-screen text-center">
      <v-img
        class="mx-auto"
        :src="require('~/assets/img/list.svg')"
        contain
        :width="
          $vuetify.breakpoint.xs
            ? '90%'
            : $vuetify.breakpoint.mdAndDown
            ? '70%'
            : '50%'
        "
      >
        <div class="d-flex center-in-img">
          <div class="no-movie navbar">
            <h2>No Bills!</h2>
          </div>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script>
import bills from '@/components/items/bills'
export default {
  components: {
    bills,
  },
  validate({ store }) {
    return store.state.auth.loggedIn
  },
  async asyncData({ $axios }) {
    const responseMovie = await $axios.$get(`/api/users/me/bill`, {
      progress: false,
    })
    return { bills: responseMovie }
  },
  data: () => ({
    bills: [],
    show: false,
  }),
}
</script>

<style lang="scss" scoped>
.center-in-img {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  .no-movie {
    opacity: 0.9;
    width: 100%;
    border-radius: 30px;
    padding: 15px;
  }
}
.pack-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 5px;
}
</style>
