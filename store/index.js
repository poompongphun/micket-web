export const state = () => ({
  // auth: null,
  alert: [{ color: '', text: '', icon: '' }],
  cart: [],
  haveAccount: false,
  library: [],
})

export const mutations = {
  addCoins(state, coins) {
    const addedCoins = state.auth.user.coins + parseFloat(coins)
    state.auth.user.coins = addedCoins.toFixed(2)
  },
  useCoins(state, coins) {
    const usedCoins = state.auth.user.coins - parseFloat(coins)
    state.auth.user.coins = usedCoins.toFixed(2)
  },
  sethaveAccount(state, bool) {
    state.haveAccount = bool
  },

  setAlert(state, alert) {
    state.alert.unshift(alert)
  },
  addCart(state, movie) {
    state.cart.push(movie)
  },
  deleteCart(state, id) {
    const index = state.cart.findIndex((movie) => movie._id === id)
    state.cart.splice(index, 1)
  },
  setLibrary(state, library) {
    state.library = library
  },
}

export const actions = {
  addCart(vuexContext, movie) {
    vuexContext.commit('addCart', movie)
  },
  deleteCart(vuexContext, id) {
    vuexContext.commit('deleteCart', id)
  },
  async getLibrary({ commit }) {
    const responseMovie = await this.$axios.$get(`/api/users/me/library/`, {
      progress: false,
    })
    commit('setLibrary', responseMovie.library)
    return responseMovie.library
  },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
  checkItemCart: (state) => (id) => {
    return state.cart.some((movie) => movie._id === id)
  },
  haveAccount(state) {
    return state.haveAccount
  },
}
