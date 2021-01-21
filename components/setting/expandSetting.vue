<template>
  <v-card class="mb-2">
    <v-card-title>
      {{ title }}
      <slot name="head"></slot>
      <v-btn icon absolute right @click="show = !show">
        <v-icon>
          {{ show ? 'mdi-minus' : 'mdi-pencil' }}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <slot name="setting"></slot>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    expand(bool) {
      this.show = bool
    },
  },
}
</script>
