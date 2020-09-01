<template>
  <div>
    <div class="box">
      <div class="select-wrap">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="queryInfo.select" placeholder="请选择" size="small">
              <el-option value="文章标题"></el-option>
              <el-option value="标签"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" size="small" clearable @clear="getContentList"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" size="small" @click="getContentList">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-wrap">
        <el-table
          :data="userList"
          style="width:100%"
          border
          size="small"
          :header-cell-style="{
            'background': 'rgb(245,250,247)',
          }"
          @cell-click="click"
        >
          <el-table-column type="index" label="#" align="center" header-align="center"></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            style="text-align:center"
            header-align="left"
            class-name="content-title"
            min-width="460"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="日期"
            width="144"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="category_id"
            label="标签"
            align="center"
            header-align="center"
            min-width="144"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center"
            header-align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditContentById(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="RemoveContentById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          background
           @current-change="getContentList()"
          :current-page.sync="queryInfo.page"
          layout="total, prev, pager, next"
          :page-size="queryInfo.pagesize"
          :total="totalData">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        select: '文章标题',
        query: '',
        page: 1,
        pagesize: 15
      },
      userList: [],
      totalData: 0
    }
  },
  created () {
    this.getContentList()
  },
  methods: {
    click (row, column, event) {
      if (column.label === '标题') {
        this.$router.push('/user/blog/' + row.id)
      }
    },
    async getContentList () {
      const { data: res } = await this.$http.get('client/content', { params: this.queryInfo })
      if (res.meta.code === 0) {
        this.userList = res.data.dataList
        this.totalData = res.data.total
      } else {
        this.$message.error('获取数据失败')
      }
    },
    async RemoveContentById (id) {
      console.log(id)
      const res = await this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(
        err => err // 捕获到错误就返回字符串 'cancel'
      )
      // 正确为confirm
      if (res === 'confirm') {
        const { data: result } = await this.$http.get('/client/content/delete', {
          params: {
            contentId: id
          }
        })
        console.log(result)
        if (result.code === 0) {
          this.getContentList()
          this.$message.success(result.message)
        }
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async EditContentById (id) {
      const { data: res } = await this.$http.get('/client/content/findContentById', {
        params: {
          contentId: id
        }
      })
      if (res.meta.code === 0) {
        this.$router.push('/user/publish/' + res.data.id)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.box{
  padding: 20px;
}
.el-table{
  margin-top: 20px;
}
.page-wrap{
  margin: 10px 0px;
  min-height: 28px;
  position: relative;
}
.el-pagination{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.table-wrap /deep/.content-title{
  cursor: pointer;
}
</style>
