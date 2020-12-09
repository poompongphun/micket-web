<template>
  <div>
    <h2 class="py-2">Watching</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
      mobile-breakpoint="500"
      class="custom-slide"
    >
      <v-slide-item v-for="n in 3" :key="n">
        <movieBlock />
      </v-slide-item>
      <!-- <template v-slot:next> > </template> -->
    </v-slide-group>
    <h2 class="py-2">All</h2>
    <v-row no-gutters>
      <v-col v-for="n in 5" :key="n" class="pa-1">
        <movieBlock />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import movieBlock from '@/components/movie/movieBlock'
export default {
  components: {
    movieBlock,
  },
}
</script>
