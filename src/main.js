import Vue from 'vue'
import App from './App.vue'

/* 导入全局样式 */
import './style/base.css';

Vue.config.productionTip = false
/* 导入element-ui */
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册 Element-ui
Vue.use(ElementUI);

//导入路由
import router from './router/router.js'
new Vue({
  //挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
