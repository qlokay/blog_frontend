<template>
    <div class="change-pass">
        <el-form :model="ruleForm" :rules="rules" ref="changePassRef" label-width="0px" class="demo-ruleForm">
            <el-form-item>
            <el-input show-password type="password" v-model.number="ruleForm.oldPass" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="newPass">
            <el-input show-password type="password" v-model="ruleForm.newPass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkNewPass">
            <el-input show-password type="password" v-model="ruleForm.checkNewPass" autocomplete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item class="btns">
            <el-button type="primary" @click="submitForm">确认</el-button>
            <el-button @click="resetForm" type="info">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.changePassRef.validateField('checkNewPass')
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkNewPass: ''
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        checkNewPass: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.changePassRef.validate(async valid => {
        const { data: res } = await this.$http.post('client/user/changePass', this.ruleForm)
        if (res.code === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    resetForm () {
      this.$refs.changePassRef.resetFields()
    }
  }
}

</script>
<style lang="less" scoped>
.change-pass{
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  .el-form-item{
    margin-bottom: 40px;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
