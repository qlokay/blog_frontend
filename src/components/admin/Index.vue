<template>
  <div class="index-wrap">
    <div class="index-left">
      <el-card class="box-card">
        <div class="user-info">
          <div class="avatar_box">
            <img :src="img" alt="">
          </div>
          <div class="username">
            {{userInfo.username}}
            <span>超级管理员</span>
          </div>
        </div>
        <hr />
        <div class="user-login-info">
            <p>上次登录时间：<span>2020-4-2</span></p>
            <p>上次登录地点：<span>加利福尼亚</span></p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>语言详情</span>
        </div>
        Vue
        <el-progress :percentage="71.3"></el-progress>
        JavaScript
        <el-progress :percentage="24.1" color="#67C23A"></el-progress>
        CSS
        <el-progress :percentage="13.7" color="#E6A23C"></el-progress>
        HTML
        <el-progress :percentage="5.9" color="#F56C6C"></el-progress>
      </el-card>
    </div>
    <div class="index-right">
      <div class="data">
        <el-card class="views">
          <el-row>
            <el-col :span="9">
              <i class="el-icon-s-custom"></i>
            </el-col>
            <el-col :span="15">
              1212
              <p>用户访问量</p>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="message">
          <el-row>
            <el-col :span="9" style="background: #67C23A;">
              <i class="el-icon-s-custom"></i>
            </el-col>
            <el-col :span="15"  style="color:#67C23A">
              999
              <p>系统消息</p>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="articles-num">
          <el-row>
            <el-col :span="9" style="background:#E6A23C">
              <i class="el-icon-s-custom"></i>
            </el-col>
            <el-col :span="15" style="color:#E6A23C">
              5678
              <p>博客数量</p>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
           </div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              :show-header="false"
              >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="title"
              >
              </el-table-column>
            </el-table>

        </el-card>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
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
        this.img = data
      })
      .catch(ex => {
        console.error(ex)
      })
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      img: '',
      tableData: [
        {
          title: '吃饭',
          done: true
        },
        {
          title: '睡觉',
          done: true
        },
        {
          title: '打豆豆',
          done: true
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
p{
  margin: 5px;
}
.avatar_box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 70px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.index-wrap{
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 2fr;
  gap: 10px 0px;
  margin-top: 10px;
  .index-left{
    display: grid;
    gap: 10px 0px;
  }
  .index-right{
    display: grid;
    gap: 10px 0px;
    grid-template-rows: 100px auto;
  }
  .user-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-avatar{
      margin-right: 50px;
    }
    .username{
      display: flex;
      font-size: 34px;
      flex-direction: column;
      span{
        font-size: 16px;
        color: rgb(173,173,173);
      }
    }
  }
  hr{
    height: 2px;
    background-color: rgb(204,204,204);
    border: none;
  }
  .user-login-info p{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(173,173,173);
  }
  .data{
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    height: 100px;
    /deep/ .el-card{
      border: none;
    }
    /deep/ .el-card__body{
      padding: 0px;
    }
    .el-row{
      height: 100px;
      .el-col-9{
        height: 100px;
        background: #409EFF;
        font-size: 40px;
        line-height: 100px;
        color: #fff;
        text-align: center;
      }
      .el-col-15{
        font-size: 30px;
        height: 100px;
        font-weight: 700;
        color: #409EFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
          font-size: 14px;
          color: #999;
          font-weight: normal;
        }
      }
    }
  }
}

</style>
