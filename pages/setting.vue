<template>
  <div>
    <h1>Setting</h1>
    <v-divider></v-divider>
    <div class="py-3">
      <changeEmail />
      <changePassword />
      <beComeCreator />
    </div>
  </div>
</template>

<script>
import changeEmail from '@/components/setting/changeEmail'
import changePassword from '@/components/setting/changePassword'
import beComeCreator from '@/components/setting/becomeCreator'
export default {
  components: {
    changeEmail,
    changePassword,
    beComeCreator,
  },
  validate({ store }) {
    return store.state.auth.loggedIn
  },
}
</script>
