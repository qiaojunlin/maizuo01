import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url2: '320500',
    name: '苏州',
    pianming: "",
    urly:"",
    urlb:"",
    urlw:'',
    urle:'',
    show:true,
  },
  getters: {
  },
  mutations: {
    add(state, e){
      state.show=e
    },
    getCitymsg(state, e){
      state.name = e.name
      state.url2 = e.cityId
    },
    dianyingyuan(state, e){
      state.urly=e.cinemaId
    },
    FilmIntro(state, e){
      state.pianming = e.name
      state.urlb=e.filmId
    },
    FilmSoon(state, e){
      state.urlw=e.filmId
    },
    filmDetail(state, e){
      state.urle=e.filmId
    },
    gotoBuy(state, e){
      state.pianming=e.name
    }
  },
  actions: {
  },
  modules: {
  }
})

