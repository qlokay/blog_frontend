<template>
  <div class="login_container">
    <div class="login_box">
        <div class="avatar_box">
            <img src="../../assets/20181023005325_diret.jpg" alt="">
        </div>
        <!-- formRef就是表单的引用对象 -->
        <el-form :model="form" ref="formRef" :rules="rules" class="login_form">
          <el-form-item prop="username">
              <el-input v-model="form.username" prefix-icon="iconfont icon-xingmingyonghumingnicheng"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="iconfont icon-mima-copy" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <span @click="register" class="register">注册账号</span>
            <div>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetInfo">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetInfo () {
      this.$refs.formRef.resetFields()
    },
    register () {
      this.$router.push('/register')
    },
    login () {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          // 结构赋值
          const { data: res } = await this.$http.post('api/user/login', this.form)
          if (res.code === 0) {
            this.$message.success(res.message)
            console.log(res)
            this.$session.save('token', res.token)
            this.$router.push('/user')
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
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0px 0px 5px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .btns /deep/ .el-form-item__content{
    display: flex;
    justify-content: space-between;
    .register{
      color: rgb(197, 197, 197);
      padding-left: 5px;
      cursor: pointer;
      &:hover{
        color: gray;
      }
    }
  }
  .btns /deep/ .el-form-item__content::after,.btns /deep/ .el-form-item__content::before{
    content: none;
  }
  .login_form{
    padding: 0px 20px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
