<template>
  <div class="bank-card">
    <div class="cards">
      <div class="item">
        <div>
          <img src="../../assets/logo.png" alt="" srcset="" />
          <span>中国工商银行</span>
        </div>
        <div>
          <div>储蓄卡</div>
        </div>
        <div>
          <div>6299****2818</div>
        </div>
      </div>
    </div>
    <div class="add-card">
      <img src="../../assets/plus_icon.png" alt="" srcset="" />
      <span>添加银行卡</span>
    </div>
  </div>
</template>
<script>
import { resize } from "@/utils/utils";
export default {
  data() {
    return {};
  },
  created() {
    resize();
    document.title = "银行卡";
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
