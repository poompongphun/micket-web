export const state = () => ({
  auth: null,
})

export const mutations = {
  addCoins(state, coins) {
    state.auth.user.coins += coins
  },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
}
