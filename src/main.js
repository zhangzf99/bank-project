// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {
  Form,
  Button,
  Field,
  Toast,
  Picker,
  Popup,
  Uploader,
  Loading,
  Dialog
} from "vant";
import "vant/lib/index.css";
Vue.use(Form)
  .use(Button)
  .use(Field)
  .use(Toast)
  .use(Picker)
  .use(Popup)
  .use(Uploader)
  .use(Loading).use(ElementUI).use(Dialog);


  

Vue.config.productionTip = false;


import axios from "axios";

// 配置请求的根路径
axios.defaults.baseURL = "/api/";
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8' 
// 挂载到原型对象之前 先设置拦截器 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  //在 request 拦截器中， 展示进度条 NProgress.start()
  // NProgress.start();
  // 为请求头对象添加Token验证的Authorization字段
  // config.headers.Authorization = `Bearer ${window.localStorage.getItem("token")}`;
  config.headers.token = `${window.localStorage.getItem("token")}`;
  // config.headers.token = `Bearer ${window.localStorage.getItem("token")}`;
  console.log('config', config)
  // 最后都必须 return config
  return config;
});


// 响应拦截器
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response.data)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})

Vue.prototype.$http = axios;




/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

