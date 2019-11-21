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
      <el-button type="primary" class="btn" @click="dialogFormVisible = true">注册</el-button>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />

    <!-- 注册对话框 -->
    <el-dialog title="用户注册" class="dialog" :visible.sync="dialogFormVisible">
      <el-form :model="registerForm">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://183.237.67.218:3002/uploads"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model.trim="registerForm.captchaCode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="zhuceCaptcha" @click="zhuceCaptchaClick" alt class="captcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button :disabled="ISdisabled" type="primary" @click="getMessage" >{{btnValue}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerClick">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
//导入axios
import axios from "axios";
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
        phone: "", //手机号码
        password: "", //密码
        captcha: "" //验证码
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
      captchaUrl: "http://183.237.67.218:3002/captcha?type=login", //登录验证码图片

      //注册对话
      //注册对话框数据
      registerForm: {
        name: "",
        email: "",
        phone: "",
        password: "",
        captchaCode: "", //图形码
        rcode: "", //短信验证码
        avatar:"" //头像地址
      },
      imageUrl: "", //上传图片
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "67px",
      zhuceCaptcha: "http://183.237.67.218:3002/captcha?type=sendsms", //注册验证码
      checked: true, //按钮 是否选择
      btnValue:"获取短信验证码",
      ISdisabled:false,//按钮是否禁用
    };
  },
  methods: {
    // 注册按钮点击事件
    registerClick(){
      //1.axios方法使用
      axios({
        url:'http://183.237.67.218:3002/register',
        method:'post',
        data:{
          name:this.registerForm.name,
          phone:this.registerForm.phone,
          email:this.registerForm.email,
          password:this.registerForm.password,
          rcode:this.registerForm.rcode,
          avatar:this.registerForm.avatar
        },
       
        }).then(res=>{
        //成功回调
        window.console.log(res)
      });
    },
    /* 注册 验证码切换 */
    zhuceCaptchaClick() {
      this.zhuceCaptcha = `http://183.237.67.218:3002/captcha?type=sendsms&${Date.now()}`;
    },
    /* 获取用户手机验证码 */
    getMessage() {
      //非空判断
      if (this.registerForm.phone.trim() == "") {
        this.$message.warning("哥们!你手机号码呢?");
        return;
      } else {
        let res = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!res.test(this.registerForm.phone)) {
          this.$message.warning("哥们!手机号码是不是写错了呀!");
          return;
        } else {
          //1.axios方法使用
          axios({
            url: "http://183.237.67.218:3002/sendsms",
            method: "post",
            data: {
              "code": this.registerForm.captchaCode,
              "phone": this.registerForm.phone
            },
            // 跨域携带cookie
            withCredentials: true
          }).then(res => {
            window.console.log(res);
          });
        }
      }
      /* 获取用户手机验证码 计时 */
      let time=60
     let steID=setInterval(()=>{
         this.ISdisabled=true;
        time--;
        this.btnValue=`${time}后可以再次获取`
        if(time==0){
          clearInterval(steID);
          this.ISdisabled=false;
          this.btnValue=`获取短信验证码`
        }
      },1000)
    },
    

    /* 文件上传成功之后会触发的回调函数 */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      window.console.log(res)
      this.registerForm.avatar=res.data.file_path
    },
    /* 文件上传之前对文件做的一些限制 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      /* 判断协议选项是否勾选 */
      if (!this.checked) {
        this.$message.warning("协议为勾选哦!");
        return;
      }

      this.$refs[formName].validate(valid => {
        /* 验证成功 */
        if (valid) {
          // alert("submit!");
          //1.axios方法使用
          axios({
            url: `http://183.237.67.218:3002/login`,
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },
            withCredentials: true
          }).then(res => {
            //成功回调
            window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("登录成功了哦!");
            } else {
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
    //改变验证码路径改变图片(验证码)
    captchaClick() {
      //方法一: 随机生成一个数  很有可能重复
      // this.captchaUrl=`http://183.237.67.218:3002/captcha?type=login&${Math.random()}`;
      //方法二 时间轴 一定不会重复
      this.captchaUrl = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
    }
  }
};
</script>

<style lang="less">
/* 登录页面 */
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

/* 对话框头部 */
.dialog .el-dialog .el-dialog__header {
  width: 603px;
  height: 53px;
  background-color: pink;
  padding: 0;
  text-align: center;
  line-height: 53px;
  background: linear-gradient(to right, blue, yellow, pink);
  .el-dialog__title {
    color: white;
    font-size: 18px;
  }
}
.el-form-item {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-dialog {
  width: 603px;
  height: 786px;
  .el-dialog__body {
    padding: 30px 27px 0 26px;
  }
}
.captcha {
  width: 143px;
  height: 40px;
}
.dialog-footer {
  text-align: center;
}
</style>