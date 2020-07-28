import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import BaiduMap from 'vue-baidu-map';
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'tnMZBBjnugsVNIpzF2r0xE55XFj4b4d1'
})
Vue.use(ElementUI)
Vue.use(VCharts)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
