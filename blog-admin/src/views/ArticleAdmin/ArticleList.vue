<template>
  <div class="articlelist-page">
    <h2>文章列表</h2>
    <el-button
      style="margin-left: 20px;"
      type="primary"
      @click="$router.replace('/article/edit')"
    >写文章</el-button>

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
            :type="(row.resource === '发表') ? 'success': 'warning'"
          >{{ row.resource }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="封面" width="160">
        <template slot-scope="{row}">
          <img :src="row.image" style="margin: 0; width: 120px; height: 60px;" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="created" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.created | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="updated" label="更新时间">
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
    >></el-pagination>
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
      listLoading: false
    };
  },
  methods: {
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
          this.getArticle();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    changePage(param) {
      if (param === "x") {
        if (!this.hasMore) {
          console.log("已经说最后一页了");
          return false;
        }
        this.page++;
      } else {
        if (this.page == 1) {
          console.log("首页");
          return false;
        }
        this.page--;
      }
      this.getArticleList();
    },

    // 获取文章列表
    async getArticleList() {
      this.listLoading = true;
      const res = await this.$http.get("/article", {
        params: {
          page: this.page,
          size: this.size
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