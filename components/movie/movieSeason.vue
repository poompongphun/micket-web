<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="defaultBg"
      show-arrows
      mobile-breakpoint="0"
    >
      <v-tab v-for="(season, i) in movieSeason" :key="i">
        {{ season.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pt-3 defaultBg">
      <v-tab-item v-for="(season, i) in movieSeason" :key="i">
        <v-card class="defaultBg" flat>
          <v-row dense>
            <v-col
              v-for="movie in season.movie"
              :key="movie._id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <v-card>
                <v-img :src="movie.media.thumbnail"></v-img>
              </v-card>
              <!-- <videoBlock
                :movie="movie"
                @publish="doPublish"
                @delete="doDelete"
                @edit="openEditMovie"
                @play="playVideo"
              /> -->
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  props: {
    movieSeason: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    tab: null,
  }),
}
</script>
