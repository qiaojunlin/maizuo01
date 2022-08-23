import Vue from 'vue'
import router from './router/index.js'
import store from './store'
import '../src/icon-font/iconfont.css'
import routers from './routers.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs' 
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer,{
  animate: {
    duration: 60,
    delay: 50
  },

}) 
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$dayjs = dayjs 
new Vue({
  router,
  store,
  render: h => h(routers)
}).$mount('#app')
