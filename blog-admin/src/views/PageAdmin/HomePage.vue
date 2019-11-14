<template>
  <div class="skilllist-page">
    <h2>技能管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加技能</el-button>

    <!-- 添加技能 -->
    <el-dialog
      title="添加技能"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="create" ref="createForm" label-width="80px">
        <el-form-item label="技能名称" prop="name">
          <el-input v-model="create.name"></el-input>
        </el-form-item>
        <el-form-item label="熟练度" prop="progress_bar">
          <el-input v-model="create.progress_bar"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createSkill('create')">添 加</el-button>
        <!-- @keyup.enter="createSkill('create')" -->
      </span>
    </el-dialog>

    <!-- 编辑技能 -->
    <el-dialog
      title="编辑技能"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="update" ref="updateForm" label-width="80px">
        <el-form-item label="技能名称" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="熟练度" prop="progress_bar">
          <el-input v-model="update.progress_bar" value="/"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSkill(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="skillList" border style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="技能名称"></el-table-column>
      <el-table-column prop="progress_bar" label="熟练度"></el-table-column>
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
        progress_bar: ""
      }, // 添加的表单项
      update: {
        name: "",
        progress_bar: 0
      }, // 修改的表单项
      skillList: []
    };
  },
  methods: {
    // 创建技能
    async createSkill() {
      this.createLoading = true;
      await this.$http.post("/skill", this.create);
      this.$message.success("创建技能成功！");
      this.addDialog = false;
      this.createLoading = false;
      this.reset();
      this.getSkill();
    },

    // 重置表单
    reset() {
      this.$refs.createForm.resetFields();
    },

    // 编辑时数据
    setCurrent(skill) {
      this.update._id = skill._id;
      this.update.name = skill.name;
      this.update.progress_bar = skill.progress_bar;
      this.updateDialog = true;
    },

    // 修改技能列表
    async updateSkill(update) {
      this.updateLoading = true;
      await this.$http.put(`/skill/${update._id}`, this.update);
      this.$message.success("修改技能成功！");
      this.updateDialog = false;
      this.updateLoading = false;
      this.getSkill();
    },

    // 删除
    removed(row) {
      this.$confirm(`是否删除技能 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/skill/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getSkill();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取技能列表
    async getSkill() {
      const res = await this.$http("/skill");
      this.skillList = res.data;
    }
  },
  created() {
    this.getSkill();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>