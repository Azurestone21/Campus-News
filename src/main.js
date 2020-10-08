import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios';
import less from 'less'
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 富文本编辑器
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use(CKEditor);

//
Vue.use(VueResource);
// 以form fonts 方式进行post请求
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

// lang = less
Vue.use(less);

// 登录拦截器
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断缓存里面是否有登录时保存的 userName
    if (window.sessionStorage.getItem('username') !== '') {
      next();
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
