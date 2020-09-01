<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">系统首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>内容列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <div class="select-wrap">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="queryInfo.select" placeholder="请选择" size="small">
              <el-option value="文章标题"></el-option>
              <el-option value="标签"></el-option>
              <el-option value="用户名"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" size="small" clearable @clear="getUserList"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" size="small" @click="getUserList">搜索</el-button>
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
            min-width="450"
            class-name="tableTitle"
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
            prop="author"
            label="作者"
            width="100"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="category_id"
            label="分类"
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
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="RemoveContentById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrap">
        <el-pagination
          background
           @current-change="getUserList()"
          :current-page.sync="queryInfo.page"
          layout="total, prev, pager, next"
          :page-size="queryInfo.pagesize"
          :total="totalData">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchUserName: '',
      queryInfo: {
        select: '文章标题',
        query: '',
        page: 1,
        pagesize: 10
      },
      userList: [],
      totalData: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    click (row, column, event) {
      if (column.label === '标题') {
        this.$router.push('/user/blog/' + row.id)
      }
    },
    async getUserList () {
      const { data: res } = await this.$http.get('admin/content', { params: this.queryInfo })
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
        const { data: result } = await this.$http.get('/admin/content/delete', {
          params: {
            contentId: id
          }
        })
        console.log(result)
        if (result.code === 0) {
          this.getUserList()
          this.$message.success(result.message)
        }
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
.el-table /deep/ .tableTitle{
  cursor: pointer;
}
</style>
