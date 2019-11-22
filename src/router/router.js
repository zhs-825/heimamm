//导入Vue
import Vue from 'vue'

//1.导入 vue-touter
import VueRouter from 'vue-router';
//使用路由
Vue.use(VueRouter);

// 导入login路由
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
//定义路由规则
const routes=[
    {path:'/login',component:login},
    {path:'/index',component:index}
]
//创建路由实例
const router=new VueRouter({
    routes
})
//暴露出去 才能挂载到main.js 的vue实例中
export default router;