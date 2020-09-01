<template>
  <div>
    <div class="box">
      <el-input
        placeholder="文章标题"
        v-model="postData.title"
        clearable
        size="medium">
      </el-input>
      <div class="mavonEditor">
        <mavon-editor :scrollStyle="true" :boxShadow="false" v-model="postData.body" placeholder="文章内容" @change="handleChange"  @imgAdd="$imgAdd" codeStyle="code-github"/>
      </div>
      <div class="tag-publish">
        <div class="tag">
          <el-input
            placeholder="自定义标签，多个标签以英文逗号分隔"
            v-model="postData.tag"
            clearable
            size="medium">
          </el-input>
          <div class="choose-tag">
            选择已有的标签:
            <span v-for="(item,index) in postData.resTag" :key="item.name" @click="clickHandle(index)" :class="{ 'active': item.isActive }">{{item.name}}</span>
          </div>
        </div>
        <el-button type="primary" size="medium" @click="publish">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogInfo: {},
      postData: {
        resTag: [],
        body: '',
        title: '',
        html: '',
        tag: '',
        id: ''
      },
      handbook: '#### how to use mavonEditor in nuxt.js'
    }
  },
  async created () {
    const { data: resTag } = await this.$http.get('/client/user/tag/com')
    if (resTag.meta.code === 0) {
      this.postData.resTag = resTag.data
      this.postData.resTag.forEach(element => {
        element.isActive = false
      })
    }
    const contentId = this.$route.params.contentId || ''
    if (contentId) {
      console.log('刷新啦')
      const { data: res } = await this.$http.get('/client/content/findContentById', {
        params: {
          contentId: this.$route.params.contentId
        }
      })
      if (res.meta.code === 0) {
        this.postData.title = res.data.title
        this.postData.tag = ''
        this.postData.body = res.data.text
        this.postData.html = res.data.content
        const tagArr = res.data.category_id.split(',')
        this.postData.resTag.forEach(element => {
          tagArr.forEach(item => {
            if (element.name === item) {
              element.isActive = true
            }
          })
        })
      }
    }
  },
  methods: {
    clickHandle (index) {
      this.$forceUpdate()
      this.postData.resTag[index].isActive = !this.postData.resTag[index].isActive
    },
    handleChange (string, html) {
      this.postData.html = html
    },
    async publish () {
      const contentId = this.$route.params.contentId || ''
      if (contentId) {
        console.log('有id')
        const { data: res } = await this.$http.post('client/content/change', {
          parmas: {
            postData: this.postData,
            id: contentId
          }
        })
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
        }
      } else {
        const { data: res } = await this.$http.post('client/content/add', {
          parmas: this.postData
        })
        if (res.code !== 0) {
          this.$message.error(res.message)
        } else {
          this.$message.success(res.message)
        }
      }
    },
    $imgAdd (pos, $file) {
      console.log(pos)
      console.log($file)
      // this.$http.post ()
    }
  }
}
</script>
<style lang="less" scoped>

  .box{
    margin-top: 10px;
    padding: 30px;
  }
  .mavonEditor{
    margin: 20px 0px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }
  .v-note-wrapper{
    min-height: 500px;
    max-height: 500px;
  }
  .tag-publish{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .choose-tag{
    margin-top: 10px;
    span{
      color: #409EFF;
      cursor: pointer;
      margin-left: 8px;
      padding: 3px 5px;
    }
    .active{
      background: #409EFF;
      color: #fff;
      padding: 3px 5px;
    }
  }
  .tag{
    width: 100%;
    .el-input{
      width: 40%;
    }
  }
</style>
