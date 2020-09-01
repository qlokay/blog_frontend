<template>
  <el-container class="home_container">
    <el-header>
      <div class="title">
        <div class="icon" @click="handleChange">
          <i :class="isCollapse? 'el-icon-s-unfold': 'el-icon-s-fold'"></i>
        </div>
        <span>博客后台管理系统</span>
      </div>
      <div class="user">
        <div class="avatar_box">
          <img :src="imgURL" alt="">
        </div>
        <!-- <el-avatar :size="40" :src="imgURL"></el-avatar> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-on:click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse? '64px': '200px'">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          unique
          text-color="#fff"
          background-color="rgb(50,65,87)"
          :collapse-transition="false"
          :router="true"
          :default-active="this.$route.path"
        >
          <el-menu-item index="/home">
            <template>
              <i class="el-icon-s-home"></i>
              <span slot="title">系统首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/category">
            <template >
              <i class="el-icon-folder-opened"></i>
              <span slot="title">分类管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/content">
            <template>
              <i class="el-icon-tickets"></i>
              <span slot="title">内容管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/users">
            <template>
              <i class="el-icon-s-custom"></i>
              <span slot="title">用户管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/user">
            <template>
              <i class="el-icon-s-platform"></i>
              <span slot="title">前台页面</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="tab-wrap">
          <el-tabs
            v-model="activeIndex"
            type="card"
            v-if="options.length"
            @tab-click="tabClick"
            @tab-remove="tabRemove"
            closable
          >
            <el-tab-pane
              :key="item.route"
              v-for="(item) in options"
              :label="item.name"
              :name="item.route"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-wrap">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      imgURL: '',
      isCollapse: false
    }
  },
  computed: {
    options () {
      return this.$store.state.options
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set () {

      }
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    handleChange () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      console.log(111)
      this.$session.remove('token')
      this.$router.push('/login')
      this.$store.commit('deleteAllTabs')
    },
    tabClick (targetName) {
      if (targetName.name !== this.$route.path) {
        this.$router.push(targetName.name)
      }
    },
    tabRemove (targetName) {
      if (targetName === '/home') {
        return
      }
      let index = 0
      for (const option of this.options) {
        if (option.route === targetName) {
          break
        }
        index++
      }
      if (targetName === this.$route.path) {
        if (this.options.length === 1) {
          if (this.$route !== '/home') {
            console.log(121212)
            this.$router.push('/home')
          }
        } else {
          this.$router.push(this.options[index - 1].route)
        }
      }
      this.$store.commit('deleteTabs', index)
    }
  },
  watch: {
    $route (to, from) {
      console.log(22222222)
      let flag = false
      for (const option of this.options) {
        if (option.route === to.path) {
          flag = true
          this.$store.commit('setActiveIndex', to.path)
          break
        }
      }
      if (!flag) {
        this.$store.commit('addTabs', { route: to.path, name: to.name })
        this.$store.commit('setActiveIndex', to.path)
      }
    }
  },
  async created () {
    const { data: res } = await this.$http.get('/client/user/userId')
    if (res.meta.code === 0) {
      console.log(res.data)
      this.$store.commit('saveDetailInfo', res.data)
    }
    this.$store.commit('addTabs', { route: '/home', name: '系统首页' })
    if (this.$route.path === '/home') {
      this.$store.commit('setActiveIndex', this.$route.path)
    } else {
      this.$store.commit('addTabs', { route: this.$route.path, name: this.$route.name })
      this.$store.commit('setActiveIndex', this.$route.path)
    }
    this.$http.get('/client/getAvatar', { responseType: 'arraybuffer' })
      .then(res => {
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
      .then((data) => {
        this.imgURL = data
      })
      .catch(ex => {
        console.error(ex)
      })
  },
  beforeRouteLeave  (to, from, next) {
    this.$store.commit('deleteAllTabs')
    next()
  }
}
</script>
<style lang="less" scoped>
.avatar_box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
<style lang="less">
.el-header{
  background-color: rgb(36,47,66);
  height: 70px;
  padding: 0px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    font-size: 22px;
    color: #fff;
    display: flex;
    align-items: center;
    .icon{
      padding: 0px 21px;
      height: 70px;
      i{
        font-size: 22px;
        line-height: 70px;
        cursor: pointer;
      }
      &:hover{
        background-color: rgb(40,52,70);
      }
    }
  }
  .user{
    margin-right: 50px;
    display: flex;
    align-items: center;
    .el-avatar{
      margin: 0 10px;
    }
    .el-dropdown-link{
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
}
.el-aside{
  background-color: rgb(50,65,87);
  .el-menu{
    border-right: none;
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
}
.el-menu-item{
  &:hover{
  background-color: rgb(40,52,70) !important;
  }
}
.el-main{
  background-color: rgb(240,240,240);
  padding: 0px !important;
  .tab-wrap{
    background-color: #fff ;
    .el-tabs__header{
      margin: 0px;
      .el-tabs__nav{
        margin: 2px 0px;
        border: none;
      }
      .el-tabs__item{
        border: 1px solid rgb(233,234,236);
        margin: 0px 5px;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
      }
      .is-active{
        color: #fff;
        background-color: rgb(64,158,255);
      }
    }
  }
}
.home_container{
    height: 100%;
}
</style>
