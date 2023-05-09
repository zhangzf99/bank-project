<template>
  <div class="forget-password">
    <div class="form">
      <div class="form-item">
        <img src="../../assets/login_telephone .png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.mobilePhone" placeholder="请输入银行卡绑定手机号" />
      </div>
      <!-- <div class="form-item form-code">
        <img src="../../assets/login_code.png" alt="" srcset="" />
        <van-field type="text" class="code" v-model="formObj.code" placeholder="请输入图形验证码" />
        <span class="item-code" @click.stop="getImageCode"><img :src="imageCode" alt="" srcset=""></span>
      </div>
      <div class="form-item form-message">
        <img src="../../assets/text_message.png" alt="" srcset="" />
        <van-field type="text" class="code" v-model="formObj.verificationCode" placeholder="请输入短信验证码" />
        <span class="item-message" @click.stop="getMessageCode"><span v-show="!hasMessageCode">获取验证码</span><span
            v-show="hasMessageCode">{{ timer
            }}s后重新获取</span></span>
      </div> -->
      <div class="form-item">
        <img src="../../assets/username.png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.userName" placeholder="请输入姓名" />
      </div>
      <div class="form-item">
        <img src="../../assets/id_no.png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.idNo" placeholder="请输入身份证号" />
      </div>
      <!-- <div class="form-item">
        <img src="../../assets/login_password.png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.password1" placeholder="请输入确认密码" />
      </div> -->
      <!-- <div class="form-item">
        <img src="../../assets/bank.png" alt="" srcset="" />
        <van-field readonly clickable name="picker" :value="formObj.job" placeholder="请选择工作类型"
          @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="jobList" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </div> -->
      <div class="form-item">
        <img src="../../assets/bank_card.png" alt="" srcset="" />
        <van-field type="text" v-model="formObj.bankCardNo" placeholder="请输入绑定银行卡号" />
      </div>

      <div class="warn-info" v-if="warnInfo">{{ warnInfo }}</div>

      <div class="buttons">
        <van-button round block type="info" native-type="submit" @click="handleSubmit()"
          :loading="btnLoading">确认</van-button>
      </div>
    </div>
    <van-dialog v-model="showDialog" title="重置密码" show-cancel-button @confirm="confirmCheck"
      :before-close="onBeforeClose">
      <div class="form form1">
        <div class="form-item">
          <img src="../../assets/login_password.png" alt="" srcset="" />
          <van-field type="text" v-model="formObj1.password" placeholder="请输入确认密码" />
        </div>
        <div class="form-item">
          <img src="../../assets/login_password.png" alt="" srcset="" />
          <van-field type="text" v-model="formObj1.password1" placeholder="请输入确认密码" />
        </div>
      </div>
      <div class="warn-info" v-if="warnInfo1">{{ warnInfo1 }}</div>
    </van-dialog>
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
import { Toast } from 'vant';
import { encode64 } from "@/utils/password";
export default {
  data() {
    return {
      formObj: {
        userName: "",
        // idType: "01",
        // mobilePhone: "",
        // // gender: "女",
        // password: "",
        // password1: '',
        // job: '',
        // verificationCode: '',
        // bankCardNo: '',
        // addressCode: '0471',
        // imageCodeUuid: ''
        userName: "",
        idNo: "",
        mobilePhone: "",
        bankCardNo: ""
      },
      formObj1: {
        idNo: "",
        uuid: "",
        password: "",
        password1: '',
        userName: ''
      },
      jobList: [],
      jobCodeList: [],
      showPicker: false,
      warnInfo: '',
      value: '',
      selectedJob: '',
      userInfo: {},
      btnLoading: false,
      imageCode: '',
      hasMessageCode: false,  // 验证码有效期内
      timer: 0,
      showDialog: false,
      warnInfo1: ''
    };
  },
  created() {
    resize();
    document.title = "忘记密码";
    // this.getJobList()
    // this.getImageCode()
  },
  methods: {
    // // 获取图片验证码
    // getImageCode() {
    //   this.$http
    //     .get("/auth/captcha/captchaImage")
    //     .then(res => {
    //       if (res.code === 200) {
    //         this.formObj.imageCodeUuid = res.uuid
    //         this.imageCode = "data:image/gif;base64," + res.img;
    //       } else {
    //         Toast('图形验证码获取失败')
    //       }
    //       console.log('this.imageCode', this.imageCode)
    //     })
    //     .catch(err => {
    //       console.log("err==", err);
    //       Toast(err);
    //     })
    //     .finally(() => {
    //       // this.loading = false;
    //     });
    // },
    // sendCode() {
    //   // 开启倒计时效果
    //   if (this.timer === 0) {
    //     this.timer = 60
    //     setInterval(() => {
    //       if (this.timer <= 0) {
    //         this.hasMessageCode = false
    //         return
    //       } else {
    //         // 单次定时任务执行的回调
    //         this.timer--
    //       }
    //     },
    //       1000,
    //       {
    //         // 默认不开启定时任务
    //         immediate: false
    //       })
    //   } else {
    //     return
    //   }
    // },



    // 获取验证码
    // getMessageCode() {
    //   if (!this.formObj.mobilePhone) {
    //     Toast('请输入手机号')
    //   }
    //   this.$http
    //     .post("/human/xingyetwocard/sendVerificationCode", {
    //       userName: this.userInfo.userName,
    //       idType: "01",
    //       mobilePhone: this.formObj.mobilePhone,
    //       uuid: this.formObj.imageCodeUuid,
    //       photoCode: this.formObj.code
    //     })
    //     .then(res => {
    //       if (res.code === 200) {
    //         this.hasMessageCode = true
    //         this.sendCode()

    //       } else {
    //         Toast(res.msg ? res.msg : '系统未知错误')
    //       }
    //       console.log('resres', res)
    //       // this.hasMessageCode = false

    //     })
    //     .catch(err => {
    //       console.log("err==", err);
    //       Toast(err);
    //     })
    //     .finally(() => {
    //       // this.loading = false;
    //     });
    // },
    // getJobList() {
    //   this.jobList = []
    //   this.jobCodeList = []
    //   this.$http
    //     .get("/human/xingyetwocard/queryJobCode",)
    //     .then(res => {
    //       res.rows.forEach((item) => {
    //         this.jobList.push(item.jobDesc)
    //         this.jobCodeList.push(item.jobCode)
    //       });
    //     })
    //     .catch(err => {
    //       console.log("err==", err);
    //       Toast(err);
    //     })
    //     .finally(() => {
    //       // this.loading = false;
    //     });
    // },
    // onConfirm(value) {

    //   this.formObj.job = value;
    //   this.showPicker = false;
    // },
    onBeforeClose(action, done) {
      if (action === 'confirm') {
        return done(false)
      } else {
        return done()
      }
    },
    confirmCheck() {
      if (this.formObj1.password !== this.formObj1.password1) {
        this.warnInfo1 = "两次密码输入不一致";
        return
      } else if (this.formObj1.password.length < 6) {
        this.warnInfo1 = "密码长度不能小于6位";
        return
      }
      this.formObj1.password = encode64(this.formObj1.password)
      this.formObj1.password1 = encode64(this.formObj1.password1)

      this.showDialog = false
      this.$http
        .post("/human/xingyetwocard/resetXyTwoPwd", {
          ...this.formObj1,
        })
        .then(res => {
          if (res.code === 200) {
            // console.log(res.data)
            // localStorage.setItem('token', res.data)
            // this.$router.push("./myAccount");

            this.showDialog = false
            Toast(res.msg)
            setTimeout(() => {
              window.history.go(-1)
            }, 1000);
          } else {
            Toast(res.msg);
            console.log("res", res);
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          // this.loading = false;
          this.btnLoading = false
        });
    },
    // 注册
    handleSubmit() {
      /**
       *
      formObj: {
        userName: "张丹丹",
        idType: "01",
        idNo: "152201197512304029",
        mobilePhone: "18748167297",
        // gender: "女",
        password: "123456",
        password1: '',
        job: '',
        verificationCode: '',
        bankCardNo: '6217000410003754814'
      },
       */
      this.warnInfo = ''
      if (!this.formObj.mobilePhone) {
        this.warnInfo = '请输入手机号'
        return
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.formObj.mobilePhone))) {
          this.warnInfo = '手机号码有误，请重填'
          return false;
        }
      }
      // if (!this.formObj.verificationCode) {
      //   this.warnInfo = '请输入短信验证码'
      //   return
      // }
      // if (!this.formObj.password) {
      //   this.warnInfo = '请输入密码'
      //   return
      // } else {
      //   if (this.formObj.password.length < 6) {
      //     this.warnInfo = "密码长度不能小于6位";
      //     return;
      //   }
      // }
      // if (!this.formObj.password1) {
      //   this.warnInfo = '请输入确认密码'
      //   return
      // } else {
      //   if (this.formObj.password.length < 6) {
      //     this.warnInfo = "密码长度不能小于6位";
      //     return;
      //   }
      // }
      if (!this.formObj.userName) {
        this.warnInfo = '请输入姓名'
        return
      }

      if (!this.formObj.idNo) {
        this.warnInfo = '请输入身份证号'
        return
      } else {
        if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.formObj.idNo))) {
          this.warnInfo = '身份证号有误，请重填'
          return false;
        }
      }
      if (!this.formObj.bankCardNo) {
        this.warnInfo = '请输入银行卡号'
        return
      }
      if (this.formObj.password !== this.formObj.password1) {
        this.warnInfo = '两次密码输入不一致，请重新输入'
        return
      }
      this.btnLoading = true
      this.$http
        .post("/human/xingyetwocard/identityVerification", {
          ...this.formObj,
          // password: encode64(this.formObj.password),
          // password1: encode64(this.formObj.password1)
        })
        .then(res => {
          if (res.code === 200) {
            // console.log(res.data)
            // localStorage.setItem('token', res.data)
            // this.$router.push("./myAccount");
            this.formObj1.uuid = res.data
            this.formObj1.idNo = this.formObj.idNo
            this.formObj1.userName = this.formObj.userName
            this.showDialog = true
          } else {
            Toast(res.msg);
            console.log("res", res);
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          // this.loading = false;
          this.btnLoading = false
        });
    }

  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
