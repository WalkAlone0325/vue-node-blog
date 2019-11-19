<template>
  <div class="projectlist-page">
    <h2>项目管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加项目</el-button>

    <!-- 添加项目 -->
    <el-dialog
      title="添加项目"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="create" :rules="rules" ref="createForm" label-width="80px">
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="create.project_name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="create.desc" placeholder="请输入项目描述"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="project_url">
          <el-input v-model="create.project_url" placeholder="请输入项目地址"></el-input>
        </el-form-item>
        <el-form-item label="项目封面" prop="img_url">
          <el-input v-model="create.img_url" placeholder="请输入项目封面地址"></el-input>或
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="create.img_url" :src="create.img_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createProject('create')">添 加</el-button>
        <!-- @keyup.enter="createProject('create')" -->
      </span>
    </el-dialog>

    <!-- 编辑项目 -->
    <el-dialog
      title="编辑项目"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form :model="update" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="update.project_name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="update.desc" placeholder="请输入项目描述"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="project_url">
          <el-input v-model="update.project_url" placeholder="请输入项目地址"></el-input>
        </el-form-item>
        <el-form-item label="项目封面" prop="img_url">
          <el-input v-model="update.img_url" placeholder="请输入项目封面地址"></el-input>或
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="update.img_url" :src="update.img_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateProject(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="projectList" border style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="project_name" label="项目名称"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="project_url" label="地址"></el-table-column>
      <el-table-column prop="img_url" label="封面">
        <template slot-scope="{row}">
          <img :src="row.img_url" style="margin: 0; width: 100px; height: 130px;" />
        </template>
      </el-table-column>
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
        project_name: "",
        project_url: "",
        desc: "",
        img_url: ""
      }, // 添加的表单项
      update: {
        project_name: "",
        project_url: "",
        desc: "",
        img_url: ""
      }, // 修改的表单项
      rules: {
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      },
      projectList: []
    };
  },
  methods: {
    // 图片上传
    afterUpload(res) {
      // this.create.image = res.filename;
      this.create.img_url = res.filename;
    },

    // 创建项目
    createProject() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          this.createLoading = true;
          await this.$http.post("/project", this.create);
          this.$message.success("创建项目成功！");
          this.addDialog = false;
          this.createLoading = false;
          this.reset();
          this.getProject();
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
    setCurrent(project) {
      console.log(project);
      this.update._id = project._id;
      this.update.project_name = project.project_name;
      this.update.project_url = project.project_url;
      this.update.desc = project.desc;
      this.update.img_url = project.img_url;
      this.update.image = project.image;
      this.updateDialog = true;
    },

    // 修改项目列表
    updateProject(update) {
      console.log(update._id);
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          this.updateLoading = true;
          await this.$http.put(`/project/${update._id}`, this.update);
          console.log(this.update);
          this.$message.success("修改项目成功！");
          this.updateDialog = false;
          this.updateLoading = false;
          this.getProject();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.project_name);
      this.$confirm(`是否删除项目 "${row.project_name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/project/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getProject();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取项目列表
    async getProject() {
      const res = await this.$http("/project");
      this.projectList = res.data.data;
      console.log(this.projectList);
    }
  },
  created() {
    this.getProject();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.avatar-uploader .el-upload {
  margin-top: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 178px;
  display: block;
}
</style>