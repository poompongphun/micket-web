export const state = () => ({
  // auth: null,
  alert: [{ color: '', text: '', icon: '' }],
  cart: [],
  haveAccount: true,
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

  setCreator(state, join) {
    state.auth.user.creator = join
  },

  sethaveAccount(state, bool) {
    state.haveAccount = bool
  },
  addWishlist(state, movie) {
    state.auth.user.wishlist.push(movie)
  },
  delWishlist(state, id) {
    const index = state.auth.user.wishlist.findIndex(
      (movie) => movie._id === id
    )
    state.auth.user.wishlist.splice(index, 1)
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
  async beCreator({ commit }, value) {
    const isJoin = value.join
    const price = value.price
    const option = {
      progress: false,
    }
    const response = isJoin
      ? await this.$axios.$post('/api/creator/join', null, option)
      : await this.$axios.$delete('/api/creator/join', option)
    if (isJoin) commit('useCoins', price)

    commit('setCreator', response.message.creator)
    return response.message.creator
  },
  async getLibrary({ commit }) {
    const responseMovie = await this.$axios.$get(`/api/users/me/library/`, {
      progress: false,
    })
    commit('setLibrary', responseMovie.library)
    return responseMovie.library
  },
  async addWishlist(vuexContext, id) {
    const responseMovie = await this.$axios.$post(
      `/api/users/me/wishlist/${id}`,
      null,
      {
        progress: false,
      }
    )
    vuexContext.commit('addWishlist', responseMovie)
    return responseMovie
  },
  async delWishlist(vuexContext, id) {
    const responseMovie = await this.$axios.$delete(
      `/api/users/me/wishlist/${id}`,
      {
        progress: false,
      }
    )
    vuexContext.commit('delWishlist', id)
    return responseMovie
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
