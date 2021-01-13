export const state = () => ({
  movieGroup: [],
})

export const mutations = {
  setGroup(state, group) {
    state.movieGroup = group
  },
  addGroup(state, group) {
    state.movieGroup.push(group)
  },
  updateGroup(state, group) {
    const id = group._id
    const index = state.movieGroup.findIndex((group) => group._id === id)
    state.movieGroup.splice(index, 1, group)
  },
  delGroup(state, id) {
    const index = state.movieGroup.findIndex((group) => group._id === id)
    state.movieGroup.splice(index, 1)
  },
  updateGroupPrice(state, value) {
    const id = value.id
    const cash = parseFloat(value.cash)
    const index = state.movieGroup.findIndex((group) => group._id === id)
    state.movieGroup[index].price += cash
  },
}

export const actions = {
  async getGroup({ commit }) {
    const responseGroup = await this.$axios.$get('/api/creator/movie-group/', {
      progress: false,
    })
    commit('setGroup', responseGroup)
    return responseGroup
  },
  // Add movie group
  async addGroup(vuexContext, data) {
    const movieGroup = data.sendData
    const posterX = data.posterX
    const posterY = data.posterY

    try {
      const responseGroup = await this.$axios.$post(
        '/api/creator/movie-group/create',
        movieGroup,
        {
          progress: false,
        }
      )
      const uploadPosterX = await vuexContext.dispatch('uploadPoster', {
        type: 'x',
        poster: posterX,
        id: responseGroup._id,
      })
      const uploadPosterY = await vuexContext.dispatch('uploadPoster', {
        type: 'y',
        poster: posterY,
        id: responseGroup._id,
      })
      if (uploadPosterX && uploadPosterY) {
        await vuexContext.commit('addGroup', uploadPosterY)
        return uploadPosterY
      } else {
        await vuexContext.commit('addGroup', responseGroup)
        return responseGroup
      }
    } catch (error) {
      vuexContext.commit(
        'setAlert',
        { color: 'error', text: error.response.data, icon: 'mdi-alert' },
        { root: true }
      )
      return error
    }
  },
  // Update Group
  async updateGroup(vuexContext, data) {
    const id = data.id
    const value = data.value
    try {
      const responseGroup = await this.$axios.$patch(
        `/api/creator/movie-group/${id}`,
        value,
        { progress: false }
      )
      if (responseGroup) {
        vuexContext.commit('updateGroup', responseGroup)
        return responseGroup
      }
    } catch (error) {
      vuexContext.commit(
        'setAlert',
        { color: 'error', text: error.response.data, icon: 'mdi-alert' },
        { root: true }
      )
      return error
    }
  },
  // Delete Group
  async delGroup(vuexContext, id) {
    try {
      const responseGroup = await this.$axios.$delete(
        `/api/creator/movie-group/${id}`,
        { progress: false }
      )
      if (responseGroup) {
        vuexContext.commit('delGroup', id)
        return responseGroup
      }
    } catch (error) {
      vuexContext.commit(
        'setAlert',
        { color: 'error', text: error.response.data, icon: 'mdi-alert' },
        { root: true }
      )
      return error
    }
  },
  // Upload Poster
  async uploadPoster(vuexContext, data) {
    const type = data.type
    const img = data.poster
    const id = data.id
    try {
      const formData = new FormData()
      formData.append('poster', img)
      const responsePoster = await this.$axios.$post(
        `/api/creator/upload/poster/${id}/${type}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          progress: false,
        }
      )
      return responsePoster
    } catch (error) {
      vuexContext.commit(
        'setAlert',
        { color: 'error', text: error.response.data, icon: 'mdi-alert' },
        { root: true }
      )
      return false
    }
  },
}

export const getters = {
  getGroupId(state) {
    return (groupId) => state.movieGroup.find((group) => group._id === groupId)
  },
}
