<template>
  <el-container class="index-container">
    <el-header>
      <div class="headerLeft">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse" :class="{'rotate':isCollapse}"></i>
        <img class="logo" src="../../assets/index-logo.png" alt />
        <span class="font">黑马面面</span>
      </div>
      <div class="headerRight">
        <img class="imgsize" src="../../assets/内网通截图20191023104857.png" />
        <span class="name">杨勇,你好</span>
        <el-button class="logout" size="mini" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧
         style="width:auto" 让宽度自适应 被内容撑开
      -->
      <el-aside width="200px" class="aside" style="width:auto">
        <el-menu default-active="5" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isCollapse: false
    };
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
         transition: .7s;
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
  .rotate{
    transform: rotate(-90deg)
  }
}
</style>