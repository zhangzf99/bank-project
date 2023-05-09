<!--
 * @Author: zhangzf99
 * @Date: 2023-04-12 22:24:49
 * @LastEditors: zhangzf99
 * @LastEditTime: 2023-04-27 22:22:45
 * @Descripttion:
 * @version:
-->
<template>
  <div class="login">
    <div class="logo">
      <img class="img" src="../../assets/logo_company.png" />
      <div class="name">内蒙古卓悦人力<br />电子账户系统</div>
    </div>
    <div class="form">
      <div class="form-item">
        <img src="../../assets/login_telephone .png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.mobilePhone" placeholder="请输入手机号" />
      </div>
      <div class="form-item">
        <img src="../../assets/login_password.png" alt="" srcset="" />
        <van-field type="password" v-model="formObj.password" placeholder="请输入密码" />
      </div>
      <div class="form-item form-code">
        <img src="../../assets/login_code.png" alt="" srcset="" />
        <van-field type="text" class="code" v-model="formObj.photoCode" placeholder="请输入验证码" />
        <span class="item-code" @click.stop="getImageCode"><img :src="imageCode" alt="" srcset=""></span>
      </div>
      <div class="warn-info" v-if="warnInfo">{{ warnInfo }}</div>
      <div class="buttons">
        <van-button round block type="info" native-type="submit" @click="handleLogin">登录</van-button>
        <van-button round block type="info" native-type="submit" @click="handleApplyAccount">注册</van-button>
      </div>
      <div class="forget-password" @click="handleForgetPassword">忘记密码</div>
    </div>
    <van-loading v-if="loading" type="spinner" size="32px" color="#1989fa" />
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
import { encode64 } from '@/utils/password'
import { Toast } from "vant";
export default {
  data() {
    return {
      formObj: { mobilePhone: "", password: '', uuid: "" },
      warnInfo: "",
      loading: false,
      imageCode: ""
    };
  },
  created() {
    resize();
    document.title = "卓悦电子账户";
    this.getImageCode()
  },
  methods: {
    handleApplyAccount() {
      this.$router.push("./uploadIdCard");
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push("./forgetPassword");
    },
    // 登录
    handleLogin() {
      // 校验输入信息
      if (!this.formObj.mobilePhone) {
        this.warnInfo = "请输入手机号";
        return;
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.formObj.mobilePhone))) {
          this.warnInfo = '手机号码有误，请重填'
          return false;
        }
      }
      if (!this.formObj.password) {
        this.warnInfo = "请输入密码";
        return;
      } else {
        if (this.formObj.password.length < 6) {
          this.warnInfo = "密码长度不能小于6位";
          return;
        }
      }
      if (!this.formObj.photoCode) {
        this.warnInfo = "请输入验证码";
        return;
      }
      this.loading = true;
      this.$http
        .post("/human/xingyetwocard/login", {
          ...this.formObj,
          password: encode64(this.formObj.password)
        })
        .then(res => {
          console.log('res', res)
          if (res.code !== 200) {
            Toast(res.msg);
            return
          }
          localStorage.setItem('token', res.data)
          this.$router.push("./myAccount");
          console.log("res", res);
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getImageCode() {
      this.$http
        .get("/auth/captcha/captchaImage")
        .then(res => {
          this.formObj.uuid = res.uuid
          this.imageCode = "data:image/gif;base64," + res.img;
          // console.log('this.imageCode', this.imageCode)
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          // this.loading = false;
        });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
@import "./login.scss";
</style>
