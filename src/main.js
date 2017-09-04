// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Load from './components/loading/index.js'
import myTem from './components/tem/index.js'

Vue.use(Load)
Vue.use(myTem)
Vue.use(ElementUI) 
Vue.prototype.$http = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
