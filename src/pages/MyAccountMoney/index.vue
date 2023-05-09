<template>
  <div class="my-account-money">
    <div class="top">
      <div class="expenditure">
        <div>支出</div>
        <div>{{ outSum }}</div>
      </div>
      <div class="income">
        <div>收入</div>
        <div>{{ inSum }}</div>
      </div>
    </div>
    <div class="details">
      <div class="item" v-for="(k, i) in historyList" :key="i">
        <div>
          <div class="opration-name">
            <span v-if="k.tradeType === '1'">充值</span>
            <span v-if="k.tradeType === '2'">提现</span>
          </div>
          <div>
            <span>{{ k.tradeTime }}</span>
          </div>
        </div>
        <div>
          <div>
            <span v-if="k.tradeType === '1'" style="color: darkgreen"> {{ k.tradeAmount }}</span>
            <span v-if="k.tradeType === '2'" style="color: red"> {{ k.tradeAmount }}</span>
          </div>
          <div>余额：{{ k.balance }}</div>
        </div>
        <!-- <div>
          <img src="../../assets/right_icon.png" alt="" />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { resize } from '@/utils/utils'
import { Toast } from 'vant';
export default {
  data() {
    return {
      inSum: 0,
      outSum: 0,
      historyList: [],
      loading: false,
      hasNextPage: false
    }
  },
  created() {
    resize()
    document.title = '我的账户'
    this.handleTransactionRecords()
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        'scroll',
        this.throttle(() => {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
            wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            conHeight = document.querySelector('.my-account-money').scrollHeight;

          if (!this.loading && this.hasNextPage && conHeight < wHeight + scrollTop + 40) {
            this.handleTransactionRecords();
          }
        }, 50)
      );
    });
  },
  methods: {

    handleTransactionRecords() {
      this.loading = false
      this.$http
        .post("/human/xingyetwocard/queryTrans", this.formObj)
        .then(res => {
          if (res.code !== 200) {
            Toast(res.msg);
            return
          }
          console.log("res", res);
          this.historyList = res.data.list
          // this.historyList.push(res.data.list)
          this.hasNextPage = true
          // this.hasNextPage = this.historyList.length === res.count
          this.inSum = res.data.in
          this.outSum = res.data.out
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    throttle(func, delay) {
      let timer = null;
      return () => {
        if (!timer) {
          timer = setTimeout(() => {
            func.apply(this);
            timer = null;
          }, delay);
        }
      };
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
