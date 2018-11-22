import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import axios from 'axios';
import proxy from 'http-proxy-middleware'
import VueCookies from 'vue-cookies'
import moment from 'moment'
import store from 'store'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 10000
// axios.defaults.baseURL = '/res'
// http请求拦截器
// axios.interceptors.request.use(config=>{
//     if (localStorage.getItem('token')) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//   return config
// },error=>{
//     Message.error({
//         message: '加载超时'
//     })
//     return Promise.reject(error)
// })
// http response 拦截器 ,拦截401状态（token过期），重新登录
// axios.interceptors.response.use(
//   response => {
//       console.log(3)
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 返回 401 清除token信息并跳转到登录页面
//                   localStorage.removeItem('token')
//                   router.replace({
//                       path: 'Login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//           }
//       }
//       return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   });
Vue.prototype.$cookies=VueCookies;
Vue.prototype.$store=store;
Vue.prototype.$axios=axios;
Vue.config.productionTip = false

// 环境变量的注释
// console.log(process.env.VUE_APP_BASE_API)
// console.log(process.env)
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
