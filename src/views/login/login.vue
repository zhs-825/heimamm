<template>
  <div class="login-container">
    <!-- 左侧form -->
    <div class="form-container">
      <!-- 标题文字 -->
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 输入框 -->
      <el-input class="phone-input" placeholder="请输入内容" prefix-icon="el-icon-user"></el-input>
      <el-input class="password" placeholder="请输入内容" prefix-icon="el-icon-lock" ></el-input>
      <el-row class="captcha-row">
        <el-col :span="17">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" ></el-input>
        </el-col>
        <el-col :span="7">
          <img src="../../assets/captcha.png" alt class="captcha" />
        </el-col>
      </el-row>
      <!-- 复选框 -->
      <el-checkbox class="cheakbox">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">主要链接</el-link>
      </el-checkbox>

      <!-- 按钮 -->
      <el-button type="primary" class="btn">登录</el-button>
      <el-button type="primary" class="btn">注册</el-button>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  height: 100%;
// 左边form表单
  .form-container {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    box-sizing: border-box; //盒子内减模型
    padding: 47px 42px 0 42px;
    // 标题头部
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        // display: inline-block;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    // 文本框
    .phone-input {
      margin-top: 29px;
    }
    .password {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
  // 复选框
  .cheakbox {
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 32px;
    .el-checkbox__label {
      display: flex;
      align-items: center;
    }
  }
  
  // 按钮
  .btn{
    display: block;
    width: 100%;
    margin-left:0;
    margin-top: 27px;
  }
}
</style>