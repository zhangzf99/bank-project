<template>
  <div class="registration-page">
    <div class="form">
      <div class="form-item">
        <img src="../../assets/login_telephone .png" alt="" srcset="" />
        <van-field
          type="text"
          v-model="formObj.mobilePhone"
          placeholder="请输入手机号"
        />
      </div>
      <div class="form-item form-code">
        <img src="../../assets/login_code.png" alt="" srcset="" />
        <van-field
          type="text"
          class="code"
          v-model="formObj.imageCode"
          placeholder="请输入图形验证码"
        />
        <span class="item-code">1122</span>
      </div>
      <div class="form-item form-message">
        <img src="../../assets/text_message.png" alt="" srcset="" />
        <van-field
          type="text"
          class="code"
          v-model="formObj.verificationCode"
          placeholder="请输入短信验证码"
        />
        <span class="item-message">获取验证码</span>
      </div>
      <div class="form-item">
        <img src="../../assets/login_password.png" alt="" srcset="" />
        <van-field
          type="password"
          v-model="formObj.password"
          placeholder="请输入6位以上密码"
        />
      </div>
      <div class="form-item">
        <img src="../../assets/login_password.png" alt="" srcset="" />
        <van-field
          type="password"
          v-model="formObj.password1"
          placeholder="请输入确认密码"
        />
      </div>
      <div class="warn-info" v-if="warnInfo">{{ warnInfo }}</div>
      <div class="buttons">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="handleSubmit"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
export default {
  data() {
    return {
      formObj: {
        mobilePhone: "",
        password: "",
        imageCode: "",
        verificationCode: "",
        password1: ""
      },
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      warnInfo: ""
    };
  },
  created() {
    resize();
    document.title = "忘记密码";
  },
  methods: {
    handleSubmit() {
      if (!this.formObj.mobilePhone) {
        this.warnInfo = "请输入手机号";
        return;
      }
      if (!this.formObj.imageCode) {
        this.warnInfo = "请输入图形验证码";
        return;
      }
      if (!this.formObj.verificationCode) {
        this.warnInfo = "请输入短信验证码";
        return;
      }
      if (!this.formObj.password) {
        this.warnInfo = "请输入密码";
        return;
      }
      if (!this.formObj.password1) {
        this.warnInfo = "请输入确认密码";
        return;
      }
      if (this.formObj.password !== this.formObj.password1) {
        this.warnInfo = "两次密码输入不一致";
        return;
      }

      this.$http
        .post("/register", this.formObj)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
