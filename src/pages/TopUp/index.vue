<template>
  <div class="withdrawal">
    <div class="title">充值方式</div>
    <div class="card">
      <div>
        <img src="../../assets/bank_logo.png" alt="" srcset="" />
      </div>
      <div>
        <div>
          兴业银行(**** {{ userData.lastAccountNo }})
        </div>
        <div>
          <!--          立即到账-->
        </div>
      </div>
      <!-- <div>
        <img src="../../assets/right_icon.png" alt="" srcset="" />
      </div> -->
    </div>
    <div class="withdrawal-amount">
      <div class="desc">充值金额</div>
      <div>
        <!-- <input type="text" /> -->
        <div class="form">
          <div class="form-item">
            <img src="../../assets/RMB_icon.png" alt="" srcset="" />
            <van-field type="number" v-model="formObj.amount" placeholder="请输入金额" />
          </div>
        </div>
      </div>
      <!--      <div class="all-money">可用余额￥{{ userData.data }}，<span @click="handleWithdrawalAll">全部提现</span></div>-->
    </div>
    <div class="buttons">
      <van-button round block type="info" native-type="submit" @click="handleWithdrawal"
        :loading="btnLoading">充值</van-button>
    </div>
  </div>
</template>
<script>
import { resize } from "@/utils/utils";
import { Toast } from 'vant';
export default {
  data() {
    return {
      btnLoading: false,
      formObj: { amount: "" },
      availableBalance: '97.72',
      userData: {}
    };
  },
  created() {
    resize();
    document.title = "充值";
    this.getMoneyBalance()
  },
  methods: {
    getMoneyBalance() {
      this.$http
        .post("/human/xingyetwocard/queryOrdinaryBalance",)
        .then(res => {
          if (res.code !== 200) {
            Toast(res.msg);
            return
          }
          console.log("res", res);
          this.userData = {
            ...res.data,
            lastAccountNo: res.data.accountNo.substring(14, 18)
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          // this.loading = false;
        });
    },
    handleWithdrawalAll() {
      this.formObj.amount = this.userData.data
    },
    handleWithdrawal() {
      if (!this.formObj.amount) {
        Toast('请出入金额');
        return
      }
      this.btnLoading = true
      this.$http
        .post("/human/xingyetwocard/recharge", this.formObj)
        .then(res => {
          if (res.code !== 200) {
            Toast(res.msg);
            return
          }
          console.log('res====', res)
          Toast(res.msg);
          this.formObj.amount = null
          // setTimeout(() => {
          //   window.history.go(-1)
          // }, 1000);
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          this.btnLoading = false;
          setTimeout(() => {
            window.history.go(-1)
          }, 1000);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
