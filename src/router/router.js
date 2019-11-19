//1.导入 vue-touter
import VueRouter from 'vue-router';
//导入Vue
import Vue from 'vue'
//使用路由
Vue.use(VueRouter);
//定义路由规则
const routes=[]
//创建路由实例
const router=new VueRouter({
    routes
})
//暴露出去 才能挂载到main.js 的vue实例中
export default router;