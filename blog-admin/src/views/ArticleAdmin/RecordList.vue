<template>
  <div class="recordlist-page">
    <h2>收录管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加收录</el-button>

    <!-- 添加收录 -->
    <el-dialog
      title="添加收录"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="create" :rules="rules" ref="createForm" label-width="80px">
        <el-form-item label="收录名称" prop="title">
          <el-input v-model="create.title"></el-input>
        </el-form-item>
        <el-form-item label="收录地址" prop="url">
          <el-input v-model="create.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createRecord('create')">添 加</el-button>
        <!-- @keyup.enter="createRecord('create')" -->
      </span>
    </el-dialog>

    <!-- 编辑收录 -->
    <el-dialog
      title="编辑收录"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="update" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="收录名称" prop="title">
          <el-input v-model="update.title"></el-input>
        </el-form-item>
        <el-form-item label="收录地址" prop="url">
          <el-input type="url" v-model="update.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRecord(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="recordList" border style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
      <el-table-column prop="updated" label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updated | timeFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="setCurrent(scope.row)">编辑</el-button>
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >></el-pagination>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      addDialog: false,
      updateDialog: false, // 编辑是否显示弹窗
      createLoading: false,
      updateLoading: false,
      create: {
        title: "",
        url: ""
      }, // 添加的表单项
      update: {
        title: "",
        url: ""
      }, // 修改的表单项
      rules: {
        title: [{ required: true, message: "请输入收录标题", trigger: "blur" }],
        url: [
          { required: true, message: "请输入收录地址", trigger: "blur" },
          {
            pattern: /https?:\/{2}[^\s]*/,
            message: "地址请以http或https开头字母和数字"
          }
        ]
      },
      recordList: [],
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
      this.getRecord();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getRecord();
    },

    // 创建收录
    createRecord() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          this.createLoading = true;
          await this.$http.post("/record", this.create);
          this.$message.success("创建收录成功！");
          this.addDialog = false;
          this.createLoading = false;
          this.reset();
          this.getRecord();
        } else {
          return false;
        }
      });
    },

    // 重置表单
    reset() {
      this.$refs.createForm.resetFields();
    },

    // 编辑时数据
    setCurrent(record) {
      // console.log(record);
      this.update._id = record._id;
      this.update.title = record.title;
      this.update.url = record.url;
      this.updateDialog = true;
    },

    // 修改收录列表
    updateRecord(update) {
      // console.log(update._id);
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.updateLoading = true;
          await this.$http.put(`/record/${update._id}`, this.update);
          this.$message.success("修改收录成功！");
          this.updateDialog = false;
          this.updateLoading = false;
          this.getRecord();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.title);
      this.$confirm(`是否删除收录 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/record/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getRecord();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取收录列表
    async getRecord() {
      const res = await this.$http("/record", {
        params: {
          page: this.page,
          size: this.size
        }
      });
      this.recordList = res.data.record;
      this.total = res.data.total;
      this.hasMore = res.data.hasMore;
      this.listLoading = false;
    }
  },
  created() {
    this.getRecord();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>