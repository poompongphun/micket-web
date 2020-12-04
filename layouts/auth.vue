<template>
  <v-app>
    <div class="custom-container" :class="{ 'sign-up-mode': signIn }">
      <nuxt class="forms-container" />
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <v-btn
              class="py-3 px-7"
              color="white"
              outlined
              rounded
              @click="swap()"
            >
              Sign up
            </v-btn>
          </div>
          <img :src="require('~/assets/img/log.svg')" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <v-btn
              class="py-3 px-7"
              color="white"
              outlined
              rounded
              @click="swap()"
            >
              Sign in
            </v-btn>
          </div>
          <img
            :src="require('~/assets/img/register.svg')"
            class="image"
            alt=""
          />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      signIn: false,
    }
  },
  methods: {
    swap() {
      this.signIn = !this.signIn
    },
  },
}
</script>
