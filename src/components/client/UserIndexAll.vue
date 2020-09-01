<template>
  <div>
    <div>
      <ul class="blog">
          <li v-for="item in getData.dataList" :key="item.id">
          <h3 @click="handleClick(item)">{{item.title}}</h3>
          <div class="content">
              <div v-html="item.text" class="index-content">
              </div>
          </div>
          <ul class="blog-info">
              <li>{{item.time}}</li>
              <li><i class="el-icon-view"></i>{{item.views}}</li>
              <li><i class="el-icon-chat-dot-square"></i>{{item.comment}}</li>
              <li><i class="el-icon-user-solid"></i>{{item.author}}</li>
          </ul>
          </li>
      </ul>
    </div>
    <div class="block">
      <el-pagination
        @current-change="getContentList"
        :current-page.sync="queryInfo.page"
        layout="prev, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="queryInfo.pagesize"
        :total="getData.total"
        :hide-on-single-page="true">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        page: 1,
        pagesize: 10,
        categoryId: this.$route.params.categoryID || ''
      },
      getData: {
        dataList: {},
        total: 0
      }
    }
  },
  methods: {
    changeHtml (str) {
      const str1 = str.replace(/<.*?>/g, ' ')
      return str1
    },
    handleClick (data) {
      console.log(data)
      this.$router.push('/forum/blog/' + data.id)
    },
    async getContentList () {
      const { data: res } = await this.$http.get('admin/content', { params: this.queryInfo })
      if (res.meta.code === 0) {
        this.getData.total = res.data.total
        console.log(this.getData.dataList)
        this.getData.dataList = res.data.dataList
        this.getData.dataList.forEach(element => {
          element.text = this.changeHtml(element.content)
        })
      }
    }
  },
  // computed: {
  //   blogInfo () {
  //     return this.$store.state.blogInfo
  //   }
  // },
  created () {
    this.getContentList()
  },
  watch: {
    $route () {
      console.log('又来监视啦')
      this.queryInfo.select = '标签'
      this.queryInfo.query = this.$route.params.categoryID
      this.getContentList()
    }
  }
}
</script>

<style lang="less" scoped>
  *{
    padding: 0px;
    margin: 0px;
  }
  .blog li{
    padding: 20px;
    &:not(:last-child){
      border-bottom: 1px rgb(157, 166, 170) dashed;
    }
    &:hover{
      background-color: rgb(245, 245, 245);
    }
    h3{
      color: rgb(118, 136, 165);
      margin-bottom: 20px;
      font-weight: normal;
      font-family: '微软雅黑';
      cursor: pointer;
    }
    .index-content{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 14px;
      font-weight: normal;
    }
    .blog-info{
      font-size: 12px;
      display: flex;
      margin-top: 20px;
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
  }
  .el-pagination{
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
  }
  .el-pagination::after, .el-pagination::before{
    content: none;
  }
</style>
