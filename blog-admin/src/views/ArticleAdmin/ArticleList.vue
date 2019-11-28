<template>
  <div class="articlelist-page">
    <h2>文章列表</h2>
    <el-form :inline="true">
      <el-form-item label="标题">
        <el-input
          type="text"
          placeholder="请输入要查询的字段"
          clearable
          v-model.trim="searchData.title"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-select v-model="searchData.resource" placeholder="请选择状态">
          <el-option label="草稿" value="0"></el-option>
          <el-option label="发表" value="1"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-circle-plus"
          style="margin-left: 20px;"
          type="primary"
          @click="$router.replace('/article/edit')"
        >写文章</el-button>
      </el-form-item>
      <!-- <el-form-item style="float: right;margin-right:0">
        <el-button type="primary" @click="openAdd">新建</el-button>
      </el-form-item>-->
    </el-form>

    <!-- 表格数据列表 -->
    <el-table :data="articleLists" border style="margin-top: 20px" v-loading="listLoading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="avatar" label="作者" width="70"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="intro" label="简介" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="tags" label="标签">
        <template slot-scope="{row}">
          <el-tag
            style="margin: 3px 3px;"
            v-for="item in row.tags"
            :key="item._id"
            effect="dark"
          >{{ item.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="resource" label="状态" width="80">
        <template slot-scope="{row}">
          <el-tag
            style="margin: 3px 3px;"
            effect="dark"
            :type="(row.resource === 1) ? 'success': 'warning'"
          >{{ row.resource === 1 ? '发表' : '草稿' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="封面" width="160">
        <template slot-scope="{row}">
          <img :src="row.image" style="margin: 0; width: 120px; height: 60px;" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="created" label="创建时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.created | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="updated" label="更新时间" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.updated | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/article/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="removed(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data() {
    return {
      articleLists: [],
      total: 0, // 文章总数
      page: 1, // 当前页数
      size: 10, // 每页的条数
      hasMore: false,
      listLoading: false,

      searchData: {
        title: ""
        // resource: null
      }
    };
  },
  methods: {
    // 搜索文章
    onSearch() {
      this.page = 1;
      this.getArticleList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getArticleList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getArticleList();
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.name);
      this.$confirm(`是否删除文字 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/article/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getArticleList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取文章列表
    async getArticleList() {
      this.listLoading = true;
      const res = await this.$http.get("/article", {
        params: {
          page: this.page,
          size: this.size,
          ...this.searchData
        }
      });
      this.articleLists = res.data.article;
      this.total = res.data.total;
      this.hasMore = res.data.hasMore;
      this.listLoading = false;
    }
  },
  created() {
    this.getArticleList();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.intro-nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 180px;
}
</style>