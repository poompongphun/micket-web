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
      mobile-breakpoint="0"
      class="custom-slide"
    >
      <v-slide-item v-for="movie in movies" :key="movie.title">
        <movieBlock
          :movie-detail="movie"
          :item-size-mobile="$vuetify.breakpoint.sm ? 1.1 : 1.3"
          :menu-size-mobile="$vuetify.breakpoint.sm ? 1.1 : 1.3"
        />
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
  async asyncData({ $axios }) {
    const responseMovie = await $axios.$get(`/api/store/movie/`, {
      progress: false,
    })
    return { movies: responseMovie }
  },
  data: () => ({
    count: 5,
    model: null,
    movies: [
      // {
      //   title: 'The Witcher',
      //   poster:
      //     'https://www.gamingdose.com/wp-content/uploads/2020/01/AAAABXH81uXzUNSVsIbZbV8eUidh4wf4mUXniE9hZb8926m7asXYaCh9XnjYuO4VSkZeJU_Nitzm8TotvouCYI15UIrX_tBp-1920x1080.jpg',
      //   price: 100,
      //   own_count: 1000,
      //   like: 125,
      //   tag: ['Sci-fi', 'Fantasy'],
      // },
      // {
      //   title: 'Money Heist',
      //   poster: 'https://mpics.mgronline.com/pics/Images/563000003510401.JPEG',
      //   price: 200,
      //   own_count: 1980,
      //   like: 125,
      //   tag: ['Drama', 'Action'],
      // },
      // {
      //   title: 'The Queens Gambit',
      //   poster:
      //     'https://cdn.lifestyleasia.com/wp-content/uploads/sites/3/2020/10/30125302/AAAABcL2iWNIx4vi4cc0PT0PTlMcuXiOrJcg0UujHyeug-6AETl6AmELWTiRI0nzrJ4MyTI-mPSFzuSnLTH63iJyJxMIVp5M-1600x900.jpg',
      //   price: 44,
      //   own_count: 222,
      //   like: 33,
      //   tag: ['Drama'],
      // },
      // {
      //   title: 'Kimetsu no Yaiba',
      //   poster:
      //     'https://i.pinimg.com/736x/31/c0/cf/31c0cf74246eb496720ec91c03049282.jpg',
      //   price: 5353,
      //   own_count: 675,
      //   like: 434,
      //   tag: ['Action', 'Fantasy', 'Comedy'],
      // },
      // {
      //   title: 'Spiderman',
      //   poster: 'https://wallpaperaccess.com/full/733951.jpg',
      //   price: 200,
      //   own_count: 6346,
      //   like: 644,
      //   tag: ['Action', 'Fantasy', 'Comedy'],
      // },
    ],
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
