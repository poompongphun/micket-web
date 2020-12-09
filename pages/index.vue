<template>
  <div>
    <v-text-field
      name="search"
      label="Search"
      class="mb-3"
      block
      filled
      rounded
      dense
      hide-details
      append-icon="mdi-magnify"
    ></v-text-field>
    <promoteSlide />
    <h2 class="py-2">Recommended</h2>
    <v-slide-group
      v-model="model"
      active-class="success"
      mobile-breakpoint="500"
      class="custom-slide"
    >
      <v-slide-item v-for="n in count" :key="n">
        <movieBlock />
      </v-slide-item>
      <!-- <template v-slot:next> > </template> -->
    </v-slide-group>
  </div>
</template>

<script>
import promoteSlide from '@/components/movie/promoteSlide'
import movieBlock from '@/components/movie/movieBlock'
export default {
  components: {
    promoteSlide,
    movieBlock,
  },
  data: () => ({
    count: 5,
    model: null,
  }),
}
</script>

<style lang="scss">
.custom-slide .v-slide-group__next,
.custom-slide .v-slide-group__prev {
  position: absolute;
  z-index: 1;
  height: 100%;
  transition: 0.2s;
  i {
    color: white;
  }
}
.custom-slide .v-slide-group__next {
  right: 0px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}
.custom-slide .v-slide-group__prev {
  left: 0px;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
}
.custom-slide .v-slide-group__next--disabled,
.custom-slide .v-slide-group__prev--disabled {
  transition: 0.2s;
  opacity: 0;
}
</style>
