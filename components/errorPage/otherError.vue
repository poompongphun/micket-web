<template>
  <div :class="{ loading: isLoading }">
    <h1 class="error-code font-weight-bold">{{ status }}</h1>
    <h2 class="error-text">{{ message }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isLoading: true,
  }),
  created() {
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  },
}
</script>

<style lang="scss">
/**/
// :root {
//   --main-color: #e7ecee;
//   --stroke-color: rgb(128, 128, 128);
// }
.error-code {
  margin: 25vh auto 0 auto;
  //   color: var(--stroke-color);
  font-family: 'BungeeOutline', sans-serif;
  font-size: 10vw;
  line-height: 7vw;
  font-weight: 200;
  text-align: center;
}
.error-text {
  margin: 20px auto 30px auto;
  //   color: var(--stroke-color);
  font-family: 'BungeeOutline', sans-serif;
  font-size: 5vw;
  font-weight: 200;
  text-align: center;
}
.error-code,
.error-text {
  -webkit-transition: opacity 0.5s linear, margin-top 0.5s linear; /* Safari */
  transition: opacity 0.5s linear, margin-top 0.5s linear;
}
.loading .error-code,
.loading .error-text {
  margin-top: 0px;
  opacity: 0;
}
@media screen and (max-width: 600px) {
  .error-code {
    margin: 30vh auto 0 auto;
    font-size: 12vw;
    line-height: 9vw;
  }
  .error-text {
    font-size: 8vw;
  }
}
</style>
