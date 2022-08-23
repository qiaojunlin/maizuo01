import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '../App.vue'
import city from '../views/City.vue'
import jump from '../views/Jump.vue'
import filmDetail from '../views/filmDetail.vue'
import studios from '../views/Studiospage.vue'
import filmintro from "../views/FilmIntro.vue"
import gotoBuy from "../views/gotoBuy.vue"
import filmsoon from "../views/FilmSoon.vue"



Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: app
  },
  {
    path: '/city',
    component: city
  }, {
    path: '/jump',
    component: jump,

  },
  {
    path: "/filmDetail",
    component: filmDetail
  },
  {
    path: "/studios",
    component: studios
  },
  {
    path: "/FilmIntro",
    component: filmintro
  },
  {
    path: "/gotoBuy",
    component: gotoBuy
  },
  {
    path: '/FilmSoon',
    component: filmsoon
  },
  

]
const router = new VueRouter({
  routes
})

export default router