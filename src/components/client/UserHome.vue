<template>
    <el-container>
        <el-aside width="200px">
            <div class="username">
                {{userInfo.username}}
            </div>
            <el-menu
                class="el-menu-vertical-demo"
                unique
                text-color="#fff"
                background-color="rgb(50,65,87)"
                :collapse-transition="false"
                :router="true"
                :default-active="this.$route.path"
            >
                <el-menu-item index="/user">
                    <template>
                    <i class="el-icon-s-home"></i>
                    <span slot="title">博客首页</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/user/blog/list">
                    <template>
                    <i class="el-icon-tickets"></i>
                    <span slot="title">我的博客</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/user/publish">
                    <template>
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">发布博客</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/user/modify">
                    <template>
                    <i class="el-icon-edit"></i>
                    <span slot="title">编辑个人信息</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/user/changepass">
                    <template>
                    <i class="el-icon-setting"></i>
                    <span slot="title">修改密码</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/logout" @click="logout">
                    <template>
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">退出登录</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/home" v-if="userInfo.isAdmin">
                    <template>
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">后台管理</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  async created () {
    const { data: res } = await this.$http.get('/client/user/userId')
    if (res.meta.code === 0) {
      console.log(res.data)
      this.$store.commit('saveDetailInfo', res.data)
    }
  },
  methods: {
    logout () {
      this.$session.remove('token')
      this.$store.commit('deleteUserInfo')
      this.$router.push('/login')
    }
  }

}

</script>
<style lang="less" scoped>
.username{
    color: #fff;
    text-align: center;
    padding-top: 10px;
    font-size: 20px;
}
.el-container{
    height: 100%;
    .el-main{
        background-color: #fff;
    }
}
.el-menu{
    border-right: none;
    color: #fff;
    .el-menu-item{
      &:hover{
        background-color: rgb(40,52,70) !important;
      }
    }
    .el-submenu{
      .el-submenu__title:hover{
        background-color: rgb(40,52,70) !important;
      }
      .el-menu--el-menu-vertical{
        background-color: rgb(40,52,70) !important;
      }
    }
}
</style>
