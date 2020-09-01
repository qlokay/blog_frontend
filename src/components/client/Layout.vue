<template>
  <div>
    <el-container>
      <el-header>
        <div class="header-top">
          <div class="user-info">
            <div class="user-name">
              {{userInfo.username}}
              <p class="user-introduction">{{userInfo.introduction}}</p>
            </div>
            <div class="avatar_box" @click="clickHanlde">
              <img :src="imgURL" alt="">
            </div>
            <!-- <el-avatar :size="40" :src="imgURL" @click.native="clickHanlde"></el-avatar> -->
          </div>
          <ul class="user-header">
              <li class="is-active" @click="toIndex">首页</li>
              <li @click="toForum">论坛</li>
              <li>
                <input type="text">
              </li>
          </ul>
        </div>
      </el-header>
      <el-container class="main">
          <el-main>
            <div class="main-content">
              <router-view></router-view>
            </div>
            <!-- <ul class="blog">
              <li v-for="item in getData.dataList" :key="item.id" @click="/">
                <h3>{{item.title}}</h3>
                <div class="content">
                  <div v-html="item.text" class="index-content">
                  </div>
                </div>
                <ul class="blog-info">
                  <li>{{item.time}}</li>
                  <li><i class="el-icon-view"></i>{{item.views}}</li>
                  <li><i class="el-icon-chat-dot-square"></i>{{item.comment}}</li>
                </ul>
              </li>
            </ul> -->
          </el-main>
          <el-aside width="220px">
            <div class="tag">
              <div class="tag-title">
                <i class="el-icon-paperclip"></i>
                <span>标签</span>
              </div>
              <ul>
                <li v-for="(item,index) in postData.resTag" :key="item._id" @click="clickHandleLi(index)" :class="{ 'active': activeIndex===index }">{{item.name}}({{item['COUNT(*)']}})</li>
              </ul>
            </div>
          </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgURL: '',
      activeIndex: null,
      postData: {
        resTag: []
      }
    }
  },
  methods: {
    clickHanlde () {
      this.$router.push('/user/blog/list')
    },
    toForum () {
      this.$router.push('/forum')
    },
    toIndex () {
      this.$router.push('/user')
      this.activeIndex = null
    },
    clickHandleLi (index) {
      this.$forceUpdate()
      this.activeIndex = index
      this.$router.push('/user/' + this.postData.resTag[index]._id)
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  async created () {
    const { data: resTag } = await this.$http.get('/client/user/tag')
    if (resTag.meta.code === 0) {
      this.postData.resTag = resTag.data
      console.log(this.postData.resTag)
    }
    const { data: res } = await this.$http.get('/client/user/userId')
    if (res.meta.code === 0) {
      console.log(res.data)
      this.$store.commit('saveDetailInfo', res.data)
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
  }
}
</script>

<style lang="less" scoped>
.avatar_box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
*{
  padding: 0px;
  margin: 0px;
}
.el-header{
  height: 200px !important;
  width: 100%;
  position: relative;
  .header-top{
    width: 60%;
    left: 50%;
    margin-top: 60px;
    color: #fff;
    position: absolute;
    bottom: 0px;
    transform: translate(-50%);
    .user-info{
      display: grid;
      grid-template-columns: 80% 20%;
      justify-items: end;
      align-items: center;
      margin-bottom: 20px;
      .user-name{
         justify-self: start;
         font-size: 26px;
         p{
           font-size: 16px;
         }
      }
      .el-avatar{
        cursor: pointer;
      }
    }
    .user-header{
      display: flex;
      background-color: rgba(50,65,87,0.5);
      li{
        font-size: 16px;
        padding: 10px 20px;
        &:hover:not(:last-child){
          background-color: rgb(40,52,70);
          cursor: pointer;
        }
        &:last-child{
          position: absolute;
          right: 20px;
          padding: 0px;
          bottom: 10px;
          input{
            width: 180px;
            padding: 2px;
            border: none;
            outline: none;
          }
        }
      }
      .is-active{
          background-color: rgb(40,52,70);
      }
    }
  }
}
.main{
  width: 60%;
  margin: 0 auto;
}
.main-content{
    background-color: #fff;
}
.el-aside{
  background-color: rgb(241,241,241);
  .tag{
    padding-bottom: 150px;
    background-color: rgb(248,248,248);
    .tag-title{
      margin: 5px 10px;
      color: rgb(77, 77, 77);
      i{
        margin-right: 5px;
      }
    }
    ul{
      border-top: 1px solid rgb(204, 203, 203);
      margin: 0px 10px;
      padding: 5px 0px;
    }
    li{
      color: rgb(131, 132, 133);
      line-height: 27px;
      cursor: pointer;
      font-size: 14px;
    }
    .active{
      color: rgb(136, 177, 197);;
    }
  }
}
</style>
