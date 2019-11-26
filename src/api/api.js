// 导入 axios
import axios from 'axios';
//导入路由
import router from '../router/router.js'
// 导入 element-ui的弹框
import { Message } from "element-ui";
//调用获取token方法
import { getItem, removeItem } from '../utils/token.js'

// 统一设置 基地址
axios.defaults.baseURL = 'http://183.237.67.218:3002';
// 统一设置 跨域携带cookie
axios.defaults.withCredentials = true;

/* 统一设置axios 拦截器 */
// 请求拦截器
// 请求发送 之前
// config 是当前这次请求的 各种设置
// 可以统一设置header
axios.interceptors.request.use(function (config) {
    config.headers.token = getItem()
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
// axios 直接使用的.then之前
// response 服务器响应的内容
axios.interceptors.response.use(function (response) {
    //判断token
    // if (response.data.code == 0 && response.data.message.indexOf('token')!=-1) {
    if (response.data.code == 0) {
        //token有问题
        //删除token
        removeItem();
        //退到登录页
        router.push("/login");
        //弹框
        Message.error(response.data.message);
        return;
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


//暴露出去 有名字的暴露 名字一般与接口地址一样
export function login(data) {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}
// 暴露出去的 注册方法
export function register(data) {
    return axios({
        url: "/register",
        method: "post",
        data
    })
}

// 暴露出去的 获取短信验证码的方法
export function sendsms(data) {
    return axios({
        url: "/sendsms",
        method: "post",
        data
    })
}

//获取用户信息
export function userInfo() {
    return axios({
        url: '/user/info',
        method: 'get',
        // headers: {
        //     token: getItem()
        // }
    })
}

//作用 抽取学科接口
export const subject = {
    // 新增
    add(data) {
        return axios({
            url: "/subject/add",
            method: "post",
            data
        })
    },
    // 列表
    // get请求的参数用params来传递
    list(params) {
        return axios({
            url: "/subject/list",
            method: "get",
            params
        })
    },
    // 状态
    status(data) {
        return axios({
            url: "/subject/status",
            method: "post",
            data
        })
    },
    // 编辑
    edit(data) {
        return axios({
            url: "/subject/edit",
            method: "post",
            data
        })
    },
    // 删除
    remove(data) {
        return axios({
            url: "/subject/remove",
            method: "post",
            data
        })
    },
}

