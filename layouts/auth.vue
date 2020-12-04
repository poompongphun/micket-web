<template>
  <v-app style="font-family: 'Poppins', sans-serif">
    <div class="custom-container" :class="{ 'sign-up-mode': signIn }">
      <div class="forms-container">
        <div class="signin-signup">
          <nuxt />
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <v-btn
              class="py-5 px-8"
              color="white"
              outlined
              rounded
              @click="goSignUp"
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
              class="py-5 px-8"
              color="white"
              outlined
              rounded
              @click="goSignIn"
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
  watch: {
    '$route.name'(id) {
      this.checkRoute()
    },
  },
  created() {
    this.checkRoute()
  },
  methods: {
    goSignUp() {
      this.$router.push('/signup')
      this.signIn = true
    },
    goSignIn() {
      this.$router.push('/signin')
      this.signIn = false
    },
    checkRoute() {
      const routeName = this.$route.name.toString()
      if (routeName === 'signin') {
        this.signIn = false
      } else {
        this.signIn = true
      }
    },
  },
}
</script>
