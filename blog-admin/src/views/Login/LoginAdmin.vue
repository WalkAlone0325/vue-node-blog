<template>
  <div class="adminlist-page">
    <h2>管理员</h2>
    <el-button
      style="margin-left: 20px;"
      type="primary"
      @click="addDialog = true"
      >添加管理员</el-button
    >

    <!-- 添加管理员 -->
    <el-dialog
      title="添加管理员"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="done => done()"
    >
      <el-form
        :model="create"
        :rules="rules"
        ref="createForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="create.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="create.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="createLoading"
          @click="createAdmin('create')"
          >添 加</el-button
        >
        <!-- @keyup.enter="createAdmin('create')" -->
      </span>
    </el-dialog>

    <!-- 编辑管理员 -->
    <el-dialog
      title="编辑管理员"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="done => done()"
    >
      <el-form
        :model="update"
        :rules="rules"
        ref="updateForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="update.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="update.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdmin(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table
      :data="adminList"
      border
      style="width: 80%; margin: 0 auto; margin-top: 20px"
    >
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updated" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updated | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="setCurrent(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="removed(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
        username: "",
        password: ""
      }, // 添加的表单项
      update: {
        username: "",
        password: ""
      }, // 修改的表单项
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符" },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "用户名请使用字母和数字"
          }
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符" }
        ]
      },
      adminList: []
    };
  },
  methods: {
    // 创建管理员
    createAdmin() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          this.createLoading = true;
          await this.$http.post("/admin", this.create);
          this.$message.success("创建管理员成功！");
          this.addDialog = false;
          this.createLoading = false;
          this.reset();
          this.getAdmin();
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
    setCurrent(admin) {
      console.log(admin);
      this.update._id = admin._id;
      this.update.username = admin.username;
      this.update.password = admin.password;
      this.updateDialog = true;
    },

    // 修改管理员列表
    updateAdmin(update) {
      console.log(update._id);
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.updateLoading = true;
          await this.$http.put(`/admin/${update._id}`, this.update);
          this.$message.success("修改管理员成功！");
          this.updateDialog = false;
          this.updateLoading = false;
          this.getAdmin();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.username);
      this.$confirm(`是否删除管理员 "${row.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/admin/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getAdmin();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取管理员列表
    async getAdmin() {
      const res = await this.$http("/admin");
      this.adminList = res.data;
    }
  },
  created() {
    this.getAdmin();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>
