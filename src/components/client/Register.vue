<template>
  <el-container class="register-container">
    <el-aside width="400px">Aside</el-aside>
    <el-main>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="registerRef" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model.number="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button @click="resetForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          console.log(this.$refs)
          this.$refs.registerRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.registerRef.resetFields()
    },
    submitForm () {
      this.$refs.registerRef.validate(async valid => {
        if (valid) {
          // 结构赋值
          const { data: res } = await this.$http.post('api/user/register', {
            username: this.ruleForm.username,
            password: this.ruleForm.pass
          })
          if (res.code === 0) {
            this.$message.success(res.message)
            this.$router.push('/login')
          } else {
            this.$message.error(res.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .register-container{
    height: 100%;
    .el-aside{
      background-size: 600px 100%;
      background: url(../../assets/bg.jpg) no-repeat 0px -200px;
    }
    .el-main{
      background-color: #fff;
      position: relative;
      .demo-ruleForm{
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .el-form-item:not(:last-of-type){
          margin-bottom: 40px;
        }
        .btns{
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
