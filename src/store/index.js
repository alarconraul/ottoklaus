import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    toys: [],
    currentToy: {}
  },
  mutations: {
    SET_CURRENT_USER(state, user){ state.currentUser = user},
    GET_TOYS(state, toys){state.toys = toys},
    SET_CURRENT_TOY(state, toy){ state.currentToy = toy},
  },
  actions: {
    setCurrentUser({commit}, user){
      commit('SET_CURRENT_USER', user)
    },
    getToys({commit}){
      axios.get('https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys').then(response => commit("GET_TOYS", response.data))
    },
    deleteToy({dispatch}, toyId){
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toyId}`).then(()=> dispatch('getToys'))
    },
    createToy({dispatch},toy){
      axios.post('https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys',toy).then(()=> dispatch("getToys")
      )
    },
    editToy({commit}, toy){
      commit("SET_CURRENT_TOY", toy)
    },
    updateToy({dispatch}, toy){
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/toys/${toy.id}`, toy.data).then(()=> dispatch('getToys'))
    }
  },
  modules: {
  }
})
