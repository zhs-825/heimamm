<template>
  <el-container class="index-container">
    <el-header>
      <div class="headerLeft">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse" :class="{'rotate':isCollapse}"></i>
        <img class="logo" src="../../assets/index-logo.png" alt />
        <span class="font">黑马面面</span>
      </div>
      <div class="headerRight">
        <img class="imgsize" :src="avatar" />
        <span class="name">{{name}}</span>
        <el-button class="logout" size="mini" type="primary" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧
         style="width:auto" 让宽度自适应 被内容撑开
      -->
      <el-aside width="200px" class="aside" style="width:auto">
        <el-menu default-active="5" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="/index/information">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/users">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* 调用抽取token方法 */
import { getItem, removeItem } from "../../utils/token";
/* 导入获取用户信息方法 */
import { userInfo } from "../../api/api.js";
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      //用户名
      name: "",
      //用户头像
      avatar: ""
    };
  },
  //生命周期钩子 vue实例创建 data与挂载点未创建
  beforeCreate() {
    const token = getItem();
    window.console.log(token);
    if (!token) {
      this.$message.error("还没登录哦!滚吧");
      this.$router.push("/login");
    }
  },
  //生命周期钩子 data刚创建
  created() {
    //1.axios方法使用
    //获取用户信息
    userInfo().then(res => {
      //成功回调
      window.console.log(res);
      //判断token 是否正确
      // if (res.data.code == 0) {
      //   //token有问题
      //   //删除token
      //   removeItem();
      //   //退到登录页
      //   this.$router.push("/login");
      //   //弹框
      //   this.$message.error("好小子,敢伪造token");
      //   return;
      // }
      this.name = res.data.data.name;
      this.avatar = `http://183.237.67.218:3002/${res.data.data.avatar}`;
    });
  },
  methods: {
    open() {
      this.$confirm("你确定要狠心离开吗?嘤嘤嘤, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          removeItem();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;

  .el-header {
    display: flex;
    justify-content: space-between;
    .headerLeft {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 24px;
        margin-right: 22px;
        transition: 0.7s;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .font {
        font-size: 22px;
        color: #49a1ffff;
      }
    }
    .headerRight {
      display: flex;
      align-items: center;
      .imgsize {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        font-style: 14px;
        margin-right: 38px;
      }
    }
  }

  .aside {
    .el-menu {
      height: 100%;
    }
  }

  .main {
    background-color: yellow;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>