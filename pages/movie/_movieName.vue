<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2">
        <v-img
          v-if="$vuetify.breakpoint.smAndUp"
          class="rounded"
          :aspect-ratio="27 / 40"
          max-width="200"
          src="https://m.media-amazon.com/images/M/MV5BZDcxOGI0MDYtNTc5NS00NDUzLWFkOTItNDIxZjI0OTllNTljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
        ></v-img>
        <v-img
          v-else
          class="rounded"
          :aspect-ratio="16 / 9"
          max-width="100%"
          src="https://mpics.mgronline.com/pics/Images/563000003510401.JPEG"
        ></v-img>
      </v-col>
      <v-col cols="12" sm="8" md="9" lg="10">
        <v-row no-gutters>
          <v-col cols="12"><h1>Money Heist</h1></v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="9">
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="overflow-auto" style="height: 125px">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Velit dolorem distinctio unde commodi, veniam eos magni
                      atque rem laboriosam aliquam doloremque? Ea deserunt odit
                      ipsam. Quasi facilis maxime incidunt laboriosam? Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Non
                      nisi sequi facere voluptatibus nesciunt dignissimos
                      voluptate fugit odio quia aut maxime, praesentium in nam,
                      modi perferendis! Veritatis ab incidunt dolor?
                    </div>
                  </v-col>
                  <v-col>
                    <v-row no-gutters align="end">
                      <v-col cols="6">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-rating
                              class="py-2"
                              v-model="rating"
                              background-color="orange lighten-3"
                              color="orange"
                              :dense="$vuetify.breakpoint.smAndDown"
                              large
                            ></v-rating>
                          </v-col>
                          <v-col cols="12" align-self="end">
                            <v-btn
                              class="pa-5"
                              color="primary"
                              rounded
                              depressed
                            >
                              Add to Wishlist
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <h2 class="success--text">90% off</h2>
                        <s class="grey--text">$100.00</s>
                        <span>$10.00</span>
                        <div></div>
                        <v-btn class="pa-5" color="success" rounded depressed>
                          Buy Pack
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="3">
                <div>
                  Creator: <v-chip class="my-1 mr-1" small>Jon Favreau</v-chip>
                </div>
                <div>
                  Stars: <v-chip class="my-1 mr-1" small>Pedro Pascal</v-chip>
                </div>
                <div>
                  Publisher:
                  <v-chip class="my-1 mr-1" small>Pedro Pascal</v-chip>
                </div>
                <div>
                  Tag: <v-chip class="my-1 mr-1" small>Action</v-chip>
                  <v-chip class="my-1 mr-1" small>Action</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="py-2"></v-divider>
    <h2>Trailer</h2>
    <v-responsive :aspect-ratio="16 / 9" width="300">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          data-plyr-embed-id="p_PJbmrX4uk"
        ></div>
      </vue-plyr>
    </v-responsive>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 3,
  }),
}
</script>
