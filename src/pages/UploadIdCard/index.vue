<template>
  <div class="upload-id-card">
    <div class="support-card">
      <span>请拍摄并上传身份证照片</span>
      <span v-if="false">支持的银行卡</span>
    </div>
    <div class="cards">
      <div class="left">
        <div>
          <!-- <van-uploader :multiple="false" v-model="fileList" :after-read="afterRead1" :max-count="1" /> -->
          <el-upload class="avatar-uploader" :action="uploadUrl1" :show-file-list="false" accept="image/*"
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
          <el-upload class="avatar-uploader" :action="uploadUrl1" :show-file-list="false" accept="image/*"
            :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <span>身份证国徽面</span>
      </div>
    </div>
    <div class="photos-example">
      <div class="desc">拍照示例</div>
      <div class="example-list">
        <div>
          <img src="../../assets/biaozhunpaishe.jpg" alt="" srcset="" />
          <div>
            <span>标准拍摄</span>
          </div>
        </div>
        <div>
          <img src="../../assets/biankuangqueshi.jpg" alt="" srcset="" />
          <div>
            <span>边框缺失</span>
          </div>
        </div>
        <div>
          <img src="../../assets/zhaopianmohu.jpg" alt="" srcset="" />
          <div>
            <span>照片模糊</span>
          </div>
        </div>
        <div>
          <img src="../../assets/shanguangqianglie.jpg" alt="" srcset="" />
          <div>
            <span>闪光强烈</span>
          </div>
        </div>
      </div>
    </div>
    <div class="notes">
      <input type="checkbox" v-model="isChecked" name="" id="" />
      本人已阅读并同意<a @click="handleReadAgreement(1)">《兴业银行个人电子账户服务协议》</a>、<a
        @click="handleReadAgreement(2)">《个人信息处理授权书》</a>、<a @click="handleReadAgreement(3)">《个人税收居民身份
        声明文件》</a>、<a @click="handleReadAgreement(4)">《兴业银行网络金融用户隐私保护条款》</a>
      首项条款。
    </div>
    <div class="buttons">
      <van-button round block type="info" native-type="submit" @click="handleSubmit"
        :loading="btnLoading">下一步</van-button>
    </div>
    <van-loading v-if="loading" type="spinner" size="32px" color="#1989fa" />
  </div>
</template>

<script>
import { resize } from "@/utils/utils";
import { Toast } from 'vant';
import axios from 'axios'
export default {
  data() {
    return {
      fileList: [],
      fileList1: [],
      fileObj: {
        faceFile: '',
        emblemFile: ""
      },
      loading: false,
      btnLoading: false,
      isChecked: false,
      imageUrl: '',
      imageUrl1: '',
      uploadUrl1: `${location.origin}/api/file/uploadv2`,
    };
  },
  created() {
    resize();
    document.title = "申请电子账户";
  },
  methods: {
    handleSubmit() {
      console.log('this.fileObj', this.fileObj)
      if (!this.fileObj.faceFile || !this.fileObj.emblemFile) {
        Toast('请上传身份证正反面');
        return
      }
      if (!this.isChecked) {
        Toast('请阅读协议及说明书');
        return
      }
      this.btnLoading = true
      this.$http
        .post("/human/xingyetwocard/ocrIdInfo", this.fileObj)
        .then(res => {
          console.log("res", res);
          this.$router.push({
            path: "./applyAccountPreview", query: {
              paramsObj: this.fileObj
            }
          });
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
    handleAvatarSuccess(res, file) {
      // console.log('res', res, file)
      this.imageUrl = URL.createObjectURL(file.raw);
      localStorage.setItem("imageUrl", URL.createObjectURL(file.raw));
      this.fileObj.faceFile = res.data.url
      console.log('this.fileObj.faceFile', this.fileObj.faceFile)

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
      localStorage.setItem("imageUrl1", URL.createObjectURL(file.raw));
      this.fileObj.emblemFile = res.data.url
      console.log('this.fileObj.faceFile', this.fileObj.emblemFile)

    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG;
    },
    handleReadAgreement(val) {
      this.$router.push({
        path: "./readAgreement", query: {
          paramsObj: {
            type: val
          }
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";
@import "./index.scss";
</style>
