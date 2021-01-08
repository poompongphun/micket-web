export const state = () => ({
  // auth: null,
  alert: [{ color: '', text: '', icon: '' }],
})

export const mutations = {
  addCoins(state, coins) {
    const addedCoins = state.auth.user.coins + coins
    state.auth.user.coins = addedCoins
  },
  useCoins(state, coins) {
    const usedCoins = state.auth.user.coins - coins
    state.auth.user.coins = usedCoins.toFixed(2)
  },
  setAlert(state, alert) {
    state.alert.unshift(alert)
  },
}

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
}
