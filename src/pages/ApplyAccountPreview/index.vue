<template>
  <div class="apply-account-preview">
    <div class="id-cards">
      <div class="cards">
        <div class="left">
          <div>
            <!-- <van-uploader :multiple="false" v-model="fileList" :after-read="afterRead1" :max-count="1" /> -->
            <el-upload class="avatar-uploader" :action="uploadUrl1" accept="image/*" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span>身份证人像面</span>
        </div>
        <div class="right">
          <div>
            <!-- <van-uploader v-model="fileList1" :after-read="afterRead2" :max-count="1" /> -->
            <el-upload class="avatar-uploader" :action="uploadUrl1" accept="image/*" :show-file-list="false"
              :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <span>身份证国徽面</span>
        </div>
      </div>
      <div class="upload">重拍上传</div>
    </div>
    <div class="form">
      <div class="comfirm">请再次确认您的身份信息</div>
      <div class="form-item">
        <span>姓名</span>
        <van-field type="text" v-model="formObj.userName" placeholder="请输入姓名" />
      </div>
      <div class="form-item">
        <span>身份证号</span>
        <van-field type="text" v-model="formObj.idNo" placeholder="请输入身份证号" />
      </div>
      <div class="form-item">
        <span>有效期</span>
        <van-field type="text" v-model="formObj.certExpiryDate" placeholder="请输入有效期" />
      </div>
      <!-- <div class="form-item">
        <span>地区</span>
        <van-field type="text" v-model="formObj.address" placeholder="请输入地区" />
      </div> -->
      <div class="form-item">
        <span>住址</span>
        <van-field type="textarea" v-model="formObj.address" placeholder="请输入住址" />
      </div>
      <div class="form-item">
        <span>居民类型</span>
        <van-field type="text" v-model="formObj.residentType" readonly placeholder="请输入居民类型" />
      </div>
      <div class="warn-info" v-if="warnInfo">{{ warnInfo }}</div>
    </div>
    <div class="tips">
      暂不支持其他居民类型在线开户
    </div>
    <div class="buttons">
      <van-button round block type="info" native-type="submit" @click="handleNextStep()"
        :loading="btnLoading">下一步</van-button>
    </div>
    <!--    <van-loading v-if="loading" type="spinner" size="32px" color="#1989fa" />-->
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
import { Toast } from 'vant';
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      pattern: /\d{6}/,
      formObj: {
        userName: "",
        idNo: '',
        faceFile: '',
        emblemFile: '',
        idType: '01',
        residentType: '中国税收居民',
        certExpiryDate: '',
        addressCode: '1501',
        address: ''
      },
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
      btnLoading: false,
      loading: false,

      fileList: [],
      fileList1: [],
      fileObj: {},
      imageUrl: '',
      imageUrl1: '',
      uploadUrl1: `${location.origin}/api/file/uploadv2`,
      warnInfo: ''
    };
  },
  created() {
    resize();
    document.title = "申请电子账户";
    if (this.$route.query) {
      if (this.$route.query.paramsObj && this.$route.query.paramsObj.faceFile && this.$route.query.paramsObj.emblemFile) {
        this.getOcrIdInfo(this.$route.query.paramsObj)
      }
    } else {
      this.getOcrIdInfo({
        faceFile: localStorage.getItem("imageUrl"),
        emblemFile: localStorage.getItem("imageUrl1")
      })
    }
    console.log('this.$route.query', this.$route.query)
  },
  mounted() {
    this.imageUrl = localStorage.getItem("imageUrl");
    this.imageUrl1 = localStorage.getItem("imageUrl1");
    if (this.$route.query.paramsObj && this.$route.query.paramsObj.faceFile && this.$route.query.paramsObj.emblemFile) {
      this.formObj = {
        ...this.formObj,
        faceFile: this.$route.query.paramsObj.faceFile,
        emblemFile: this.$route.query.paramsObj.emblemFile
      }
      this.fileObj = {
        faceFile: this.$route.query.paramsObj.faceFile,
        emblemFile: this.$route.query.paramsObj.emblemFile
      }
    } else {
      this.formObj = {
        ...this.formObj,
        faceFile: localStorage.getItem("imageUrl"),
        emblemFile: localStorage.getItem("imageUrl1")
      }
      this.fileObj = {
        faceFile: localStorage.getItem("imageUrl"),
        emblemFile: localStorage.getItem("imageUrl1")
      }
    }
  },
  methods: {
    // 下一步
    handleNextStep() {
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
      if (!this.formObj.certExpiryDate) {
        this.warnInfo = '请输入有效期'
        return
      }

      if (!this.formObj.address) {
        this.warnInfo = '请输入住址'
        return
      }
      this.btnLoading = true
      let obj = {
        ...this.formObj,
        ...this.fileObj
      }
      this.$http
        .post("/human/xingyetwocard/checkIdCard", obj)
        .then(res => {
          if (res.code !== 200) {
            Toast(res.msg);
          } else {
            this.$router.push({
              path: "./applyAccount"
            });
            // 本地存储信息
            localStorage.setItem('formObj', JSON.stringify(obj))
            console.log('res', res)
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          this.loading = false;
          this.btnLoading = false;
        });
    },
    // 调用OCR获取用户信息
    getOcrIdInfo(obj) {
      this.loading = true
      this.$http
        .post("/human/xingyetwocard/ocrIdInfo", obj)
        .then(res => {
          console.log('res', res)
          if (res.code === 200) {
            this.formObj = {
              ...this.formObj,
              userName: res.data.userName,
              idNo: res.data.idNo,
              certExpiryDate: res.data.certExpiryDate,
              address: res.data.address
            }
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log("err==", err);
          Toast(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data.url)
      // console.log('res', res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      // localStorage.setItem("imageUrl", URL.createObjectURL(file.raw));
      // this.fileObj.faceFile = res.data.url
      this.fileObj = {
        ...this.fileObj,
        faceFile: res.data.url
      }
      console.log('this.fileObj.faceFile', this.fileObj.faceFile)
      this.getOcrIdInfo(this.fileObj)
    },
    beforeAvatarUpload(file) {
      let img = file.name.substring(file.name.lastIndexOf('.') + 1)
      const suffix = img === 'jpg'
      const suffix2 = img === 'png'
      const suffix3 = img === 'jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!suffix && !suffix2 && !suffix3) {
        this.$message.error("只能上传图片！");
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return img;
    },
    handleAvatarSuccess1(res, file) {
      // console.log('res', res, file)
      this.imageUrl1 = URL.createObjectURL(file.raw);
      // localStorage.setItem("imageUrl1", URL.createObjectURL(file.raw));
      // this.fileObj.emblemFile = res.data.url
      this.fileObj = {
        ...this.fileObj,
        emblemFile: res.data.url
      }
      console.log('this.fileObj.faceFile', this.fileObj.emblemFile)
      this.getOcrIdInfo(this.fileObj)
    },
    beforeAvatarUpload1(file) {
      let img = file.name.substring(file.name.lastIndexOf('.') + 1)
      const suffix = img === 'jpg'
      const suffix2 = img === 'png'
      const suffix3 = img === 'jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!suffix && !suffix2 && !suffix3) {
        this.$message.error("只能上传图片！");
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return img;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
