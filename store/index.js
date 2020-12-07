export const state = () => ({})

export const getters = {
  loggedInUser(state) {
    return state.auth.user
  },
}
