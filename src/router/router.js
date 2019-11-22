//导入Vue
import Vue from 'vue'

//1.导入 vue-touter
import VueRouter from 'vue-router';
//使用路由
Vue.use(VueRouter);

// 导入登录注册路由
import login from '../views/login/login.vue'
//导入首页路由
import index from '../views/index/index.vue'

/* 嵌套路由组件导入 */
import subject from '../views/index/subject/subject.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import users from '../views/index/users/users.vue'
import question from '../views/index/question/question.vue'
import information from '../views/index/information/information.vue'
//定义路由规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/index',
        component: index,
        children:[
            {path:'subject',component:subject},
            {path:'enterprise',component:enterprise},
            {path:'users',component:users},
            {path:'question',component:question},
            {path:'information',component:information},
        ]
    }
]
//创建路由实例
const router = new VueRouter({
    routes
})
//暴露出去 才能挂载到main.js 的vue实例中
export default router;