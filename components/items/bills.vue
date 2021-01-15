<template>
  <div>
    <v-card>
      <v-card-title>
        {{ bill.create_date }}
        <v-chip class="mx-2" small>{{ bill.order.length }}</v-chip>
        <v-btn icon absolute right @click="show = !show">
          <v-icon>
            {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-row v-for="movie in bill.order" :key="movie._id" no-gutters>
            <v-col cols="3" sm="3" lg="2" align-self="center">
              <v-card class="elevation-0">
                <v-img :src="movie.media.thumbnail" width="100%"></v-img>
              </v-card>
            </v-col>
            <v-col cols="9" sm="9" lg="10" class="px-2 py-1">
              <h3 class="primary--text px-1">{{ movie.name }}</h3>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
}
</script>
