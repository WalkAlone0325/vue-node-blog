<template>
  <div class="menulist-page">
    <h2>导航管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加导航</el-button>

    <!-- 添加导航 -->
    <el-dialog
      title="添加导航"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="create" :rules="rules" ref="createForm" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="create.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="create.path"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createMenu('create')">添 加</el-button>
        <!-- @keyup.enter="createMenu('create')" -->
      </span>
    </el-dialog>

    <!-- 编辑导航 -->
    <el-dialog
      title="编辑菜单"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="update" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="update.path" value="/"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateMenu(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="menuList" border style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
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
        name: "",
        path: ""
      }, // 添加的表单项
      update: {
        name: "",
        path: ""
      }, // 修改的表单项
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符" }
        ],
        path: [
          { required: true, message: "请输入菜单路径", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符" },
          {
            pattern: /^\/[A-Za-z0-9]+$/,
            message: "路径只是以/开头字母和数字"
          }
        ]
      },
      menuList: []
    };
  },
  methods: {
    // 创建菜单
    createMenu() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          this.createLoading = true;
          await this.$http.post("/menu", this.create);
          this.$message.success("创建菜单成功！");
          this.addDialog = false;
          this.createLoading = false;
          this.reset();
          this.getMenu();
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
    setCurrent(menu) {
      console.log(menu);
      this.update._id = menu._id;
      this.update.name = menu.name;
      this.update.path = menu.path;
      this.updateDialog = true;
    },

    // 修改菜单列表
    updateMenu(update) {
      console.log(update._id);
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.updateLoading = true;
          await this.$http.put(`/menu/${update._id}`, this.update);
          console.log(this.update);
          this.$message.success("修改菜单成功！");
          this.updateDialog = false;
          this.updateLoading = false;
          this.getMenu();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.name);
      this.$confirm(`是否删除菜单 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/menu/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getMenu();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取菜单列表
    async getMenu() {
      const res = await this.$http("/menu");
      this.menuList = res.data;
    }
  },
  created() {
    this.getMenu();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>