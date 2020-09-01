<template>
  <div class="user-info">
    <el-form status-icon :model="userInfoForm" :rules="rules" ref="userInfoRef" label-width="60px" class="form">
        <el-form-item label="">
            <el-upload
                ref="uploadImgRef"
                enctype="multipart/form-data"
                :headers="{Authorization : this.$session.fentch('token')}"
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="avatar-uploader-icon el-icon-camera-solid"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
            <el-input v-model="userInfoForm.username"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
            <el-input v-model="userInfoForm.introduction"></el-input>
        </el-form-item>
        <el-form-item class="btns">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm" type="info">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    // var validUername = (rule, value, callback) => {
    //   if (value === this.userInfo.username) {
    //     callback(new Error('不能与旧昵称相同'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      uploadUrl: 'http://localhost:8888/client//user/avatar',
      imageUrl: '',
      uploadForm: new FormData(),
      userInfoForm: {
        username: '',
        introduction: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
          // { validator: validUername, trigger: 'blur' }
        ],
        introduction: [
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  created () {
    this.$http.get('/client/getAvatar', { responseType: 'arraybuffer' })
      .then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
      .then((data) => {
        this.imageUrl = data
        this.userInfoForm.username = this.userInfo.username
        this.userInfoForm.introduction = this.userInfo.introduction
      })
      .catch(ex => {
        console.error(ex)
      })

    // if (res.meta.code === 0) {
    //   console.log(res.data)
    //   this.$store.commit('saveDetailInfo', res.data)
    // }
  },
  methods: {
    resetForm () {
      this.$refs.userInfoRef.resetFields()
    },
    submitForm () {
      this.$refs.userInfoRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('client/user/modify', this.userInfoForm)
          if (res.code === 0) {
            this.$message.success(res.message)
          }
        }
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {

    }
  }
}
</script>

<style lang="less" scoped>
.user-info{
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
}
.avatar-uploader{
    text-align: center;
    margin-bottom: 22px;
}
.el-form-item:nth-of-type(2){
  margin-bottom: 50px;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    top: 50%;
}
.avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.avatar {
    width: 150px;
    height: 150px;
    display: block;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>
