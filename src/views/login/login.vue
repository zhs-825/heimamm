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
      <!-- 表单 -->
      <!-- 输入框 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label prop="phone">
          <el-input
            class="phone-input"
            placeholder="请输入手机号码"
            prefix-icon="el-icon-user"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label prop="password">
          <el-input
            class="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model.trim="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-search"
                v-model="loginForm.captcha"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img :src="captchaUrl" alt class="captcha" @click="captchaClick" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 复选框 -->
      <el-checkbox class="cheakbox" v-model="checked">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">主要链接</el-link>
      </el-checkbox>

      <!-- 按钮 -->
      <el-button type="primary" class="btn" @click="submitForm('ruleForm')">登录</el-button>
      <el-button type="primary" class="btn">注册</el-button>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>


<script>
//导入axios
import axios from 'axios'
export default {
  name: "login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空哦!"));
      } else {
        let res = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (res.test(value)) {
          callback();
        } else {
          callback(new Error("手机号码格式不对喔!"));
        }
      }
    };
    return {
      // 登录表单数据
      loginForm: {
        phone: "",//手机号码
        password: "",//密码
        captcha: "",//验证码
       
      },
      // 登录验证规则
      loginRules: {
        /* 自定义校检规则 */
        phone: [{ validator: checkAge }],
        password: [
          //required 最左边红色**
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符" }
        ],
        captcha: [
          //required 最左边红色**
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "长度只能在4位数哦" }
        ]
      },
      captchaUrl:'http://183.237.67.218:3002/captcha?type=login' ,//验证码图片
      checked:true
    };
  },
  methods: {
    submitForm(formName) {
      /* 判断协议选项是否勾选 */
      if(!this.checked){
         this.$message.warning("协议为勾选哦!");
         return;
      }

      this.$refs[formName].validate(valid => {
        /* 验证成功 */
        if (valid) {
          // alert("submit!");
          //1.axios方法使用
          axios({
            url:`http://183.237.67.218:3002/login`,
            method:'post',
            data:{ 
              phone:this.loginForm.phone, 
              password:this.loginForm.password,
              code:this.loginForm.captcha
             },
             withCredentials:true
            }).then(res=>{
            //成功回调
            window.console.log(res)
            if(res.data.code==200){
              this.$message.success("登录成功了哦!");
            }else{
              this.$message.warning("傻逼,忘记密码了吧");
            }
          });
        } else {
         window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    captchaClick(){
      //改变验证码路径改变图片(验证码)
      //方法一: 随机生成一个数  很有可能重复
      // this.captchaUrl=`http://183.237.67.218:3002/captcha?type=login&${Math.random()}`;
      //方法二 时间轴 一定不会重复
      this.captchaUrl=`http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;

    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );

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
  .btn {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-top: 27px;
  }
}
</style>