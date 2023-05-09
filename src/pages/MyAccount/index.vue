<template>
  <div class="my-account">
    <div class="user-info">
      <div class="name">
        {{userData.userName}}
      </div>
      <div class="head-sculpture">
        <img src="../../assets/bank_logo.png" alt="" srcset="" />
        <!-- <img src="../../assets/right_icon.png" alt="" srcset="" /> -->
      </div>
    </div>
    <div class="cards">
      <div class="item">
        <div>
          <img src="../../assets/bank_logo.png" alt="" srcset="" />
          <span>兴业II类户</span>
        </div>
        <div>
          <div v-if="!show">{{ userData.accountNoPwd }}</div>
          <div v-else>{{ userData.accountNo }}</div>
          <div @click="show = !show">查看卡号</div>
        </div>
        <div>
          <div>可用余额</div>
        </div>
        <div>
          <div>{{ userData.acctAvblBalance }}</div>
        </div>
      </div>
    </div>
    <div class="account-manage">
      <div class="module-name">
        账户管理
      </div>
      <div class="options">
        <div class="items item1" @click="handleWithdrawal">
          <div class="img-box">
            <img src="../../assets/withdrawal.png" alt="" srcset="" />
          </div>
          <div>提现</div>
        </div>
        <div class="items item2" @click="handleSeeBill">
          <div class="img-box">
            <img src="../../assets/bill_icon.png" alt="" srcset="" />
          </div>
          <div>查看账单</div>
        </div>
        <div class="items item3" @click="handleTopUp">
          <div class="img-box">
            <img src="../../assets/bank_card1.png" alt="" srcset="" />
          </div>
          <div>充值</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
export default {
  data() {
    return {
      userData: {},
      show: false
    };
  },
  created() {
    resize();
    document.title = "我的账户";
    this.getMoneyBalance()
  },
  methods: {
    handleSeeBill() {
      this.$router.push("./MyAccountMoney");
    },
    handleWithdrawal() {
      this.$router.push("./Withdrawal");
    },
    handleTopUp() {
      this.$router.push("./TopUp");
    },
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
            accountNoPwd: res.data.accountNo.substring(0,4) + '****' + res.data.accountNo.substring(14,18)
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          // this.loading = false;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
