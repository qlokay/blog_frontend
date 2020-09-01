<template>
  <div class="blog">
    <h3 class="title">{{blogInfo.title}}</h3>
    <ul class="blog-info">
        <li>{{blogInfo.time}}</li>
        <li><i class="el-icon-view"></i>{{blogInfo.comment}}</li>
        <li><i class="el-icon-chat-dot-square"></i>{{blogInfo.views}}</li>
        <li><i class="el-icon-s-custom"></i>{{blogInfo.author}}</li>
    </ul>
    <div class="markdown-body" v-html="blogInfo.content">

    </div>
    <div class="tag">
        <i class="el-icon-collection-tag"></i>{{blogInfo.category_id}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgURL: require('@/assets/20181023005325_diret.jpg'),
      blogInfo: {}
    }
  },
  async created () {
    console.log('刷新啦')
    const { data: res } = await this.$http.get('/client/content/findContentById', {
      params: {
        contentId: this.$route.params.contentId
      }
    })
    if (res.meta.code === 0) {
      this.blogInfo = res.data
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/markdown.css";
*{
    padding: 0px;
    margin: 0px;
}
.blog{
    padding: 10px 40px 30px 40px;
}
.title{
    color: rgb(118, 136, 165);
    text-align: center;
    margin: 20px 0px;
    font-weight: normal;
    font-family: '微软雅黑';
    font-size: 20px;
}
.blog-info{
    font-size: 12px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    color: rgb(113, 132, 141);
    i{
    margin-right: 5px;
    }
    li{
    padding: 0px;
    margin-right: 15px;
    border: none;
    }
}
.tag{
  padding: 10px 0px;
  color: rgb(113, 132, 141);
  font-size: 12px;
  i{
    margin-right: 5px;
  }
}

</style>
