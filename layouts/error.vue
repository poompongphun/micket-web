<template>
  <div dark>
    <notFound v-if="error.statusCode === 404" />
    <otherError v-else :status="error.statusCode" :message="otherError" />
  </div>
</template>

<script>
import notFound from '@/components/errorPage/404'
import otherError from '@/components/errorPage/otherError'
export default {
  layout: 'empty',
  components: {
    notFound,
    otherError,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
