<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card v-ripple="$vuetify.breakpoint.smAndDown && !hover">
        <v-row no-gutters>
          <v-col cols="12" md="5">
            <v-card
              class="elevation-0"
              height="100%"
              width="100%"
              color="iconBg"
            >
              <v-img
                height="100%"
                width="100%"
                :aspect-ratio="27 / 40"
                :lazy-src="require('~/assets/logo/GrayMicket.svg')"
                :src="
                  movieData.poster.y || require('~/assets/logo/GrayMicket.svg')
                "
              >
                <v-expand-transition>
                  <div
                    v-if="hover && $vuetify.breakpoint.smAndDown"
                    class="d-flex transition-fast-in-fast-out v-card--reveal white--text"
                    style="height: 100%"
                  >
                    <div
                      class="background darken-2 iconBg"
                      style="height: 100%"
                    ></div>
                    <div class="pa-1 item">
                      <v-btn
                        v-if="movieData.public"
                        class="mb-1"
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        :to="`/movie/${movieData._id}`"
                      >
                        <v-icon left>mdi-storefront</v-icon>
                        Store
                      </v-btn>
                      <v-btn
                        class="mb-1"
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        :to="`/mystore/${movieData._id}`"
                      >
                        <v-icon left>mdi-upload</v-icon>
                        Upload
                      </v-btn>
                      <v-btn
                        v-if="movieData.public"
                        class="mb-1"
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        @click="publish(movieData._id, false)"
                      >
                        <v-progress-circular
                          v-if="publicLoading"
                          class="mr-3"
                          indeterminate
                          color="primary"
                          :size="18"
                          :width="2"
                        ></v-progress-circular>
                        <v-icon v-else left>mdi-lock</v-icon>
                        Private
                      </v-btn>
                      <v-btn
                        v-else
                        class="mb-1"
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        @click="publish(movieData._id, true)"
                      >
                        <v-progress-circular
                          v-if="publicLoading"
                          class="mr-3"
                          indeterminate
                          color="primary"
                          :size="18"
                          :width="2"
                        ></v-progress-circular>
                        <v-icon v-else left>mdi-earth</v-icon>
                        Public
                      </v-btn>
                      <v-btn
                        class="mb-1"
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        @click="editMovie(movieData._id)"
                      >
                        <v-icon left>mdi-pencil</v-icon>
                        Edit
                      </v-btn>
                      <v-btn
                        color="iconBg"
                        depressed
                        block
                        :small="$vuetify.breakpoint.xs"
                        @click="deleteMovie(movieData._id)"
                      >
                        <v-icon left>mdi-trash-can</v-icon>
                        Delete
                      </v-btn>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>

            <div class="status-icon">
              <v-icon v-if="movieData.public" color="green accent-3" small>
                mdi-earth
              </v-icon>
              <v-icon v-else color="red" small> mdi-lock </v-icon>
              <span v-if="movieData.discount === 0" class="white--text">
                ${{ movieData.price }}
              </span>
              <span v-else class="green--text text--accent-3">
                ${{ calcDiscount(movieData.price, movieData.discount) }}
              </span>
            </div>
          </v-col>
          <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="0" md="7">
            <v-card
              class="d-flex align-start flex-column elevation-0"
              height="100%"
            >
              <div class="pt-2 pl-2 pr-1 pb-1" style="width: 100%">
                <h3
                  class="font-weight-bold text-uppercase mt-1 primary--text text-truncate"
                  style="display: inline-block; width: 70%"
                >
                  {{ movieData.title }}
                </h3>
                <v-menu
                  offset-x
                  bottom
                  left
                  transition="slide-x-reverse-transition"
                  min-width="160"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="float-right"
                      color="grey"
                      top
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item @click="editMovie(movieData._id)">
                      <v-icon class="mr-3">mdi-pencil</v-icon>
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteMovie(movieData._id)">
                      <v-icon class="mr-3">mdi-trash-can</v-icon>
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div
                class="px-1 overflow-hidden normalText--text"
                :style="`width: 100%; font-size:0.9rem; height: ${
                  $vuetify.breakpoint.mdAndDown ? '70px' : '125px'
                }`"
              >
                {{ movieData.description }}
              </div>
              <div class="px-1 pb-1 mt-auto">
                <v-btn
                  v-if="movieData.public"
                  class="pa-0"
                  text
                  depressed
                  min-width="0"
                  min-height="0"
                  width="40"
                  height="40"
                  :to="`/movie/${movieData._id}`"
                >
                  <v-icon>mdi-storefront</v-icon>
                </v-btn>
                <v-btn
                  class="pa-0"
                  text
                  depressed
                  min-width="0"
                  min-height="0"
                  width="40"
                  height="40"
                  :to="`/mystore/${movieData._id}`"
                >
                  <v-icon>mdi-upload</v-icon>
                </v-btn>
                <v-btn
                  class="pa-0"
                  text
                  depressed
                  min-width="0"
                  min-height="0"
                  width="40"
                  height="40"
                  @click="
                    movieData.public
                      ? publish(movieData._id, false)
                      : publish(movieData._id, true)
                  "
                >
                  <v-progress-circular
                    v-if="publicLoading"
                    indeterminate
                    color="primary"
                    :size="18"
                    :width="2"
                  ></v-progress-circular>
                  <v-icon v-else>
                    {{ movieData.public ? 'mdi-lock' : 'mdi-earth' }}
                  </v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    movieData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    publicLoading: false,
  }),
  methods: {
    editMovie(id) {
      this.$emit('edit', id)
    },
    async deleteMovie(id) {
      try {
        const response = await this.$store.dispatch('mystore/delGroup', id)
        if (response) {
          // this.$emit('delete', id)
        }
      } catch (error) {
        this.$store.commit('setAlert', {
          color: 'error',
          text: error.response.data,
          icon: 'mdi-alert',
        })
      }
    },
    async publish(id, state) {
      this.publicLoading = true
      const response = await this.$store.dispatch('mystore/updateGroup', {
        id,
        value: { public: state },
      })
      if (response) {
        this.publicLoading = false
      }
    },
    calcDiscount(price, percent) {
      const calc = price - (price / 100) * percent
      return calc.toFixed(2)
    },
  },
}
</script>

<style lang="scss" scoped>
.status-icon {
  position: absolute;
  top: 0;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
  .background {
    opacity: 0.8;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .item {
    width: 100%;
  }
}
</style>
