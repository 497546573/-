import Vue from 'vue'
import App from './App.vue'
import router from './router'
/*  饿了吗框架   */
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
/*  bootatrap框架   */
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
/*   axios  */
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:80/api'
axios.defaults.headers['Content-Type'] = 'application/x-www-from-urlencoded'

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  let user= localStorage.getItem('token') ? localStorage.getItem('token') : null
  if(user){
    config.headers['token'] = user;  // 设置请求头
  }
  return config
}, error => {
  return Promise.reject(error)
});

/* 导入qs*/
import qs from 'qs'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.qs = qs

new Vue({
  axios,
  router,
  qs,
  render: h => h(App)
}).$mount('#app')
