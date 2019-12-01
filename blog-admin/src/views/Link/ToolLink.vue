<template>
  <div class="toollinksList-page">
    <h2>工具管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加工具</el-button>

    <!-- 添加工具 -->
    <el-dialog
      title="添加工具"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form ref="createForm" :rules="rules" :model="create" label-width="80px">
        <el-form-item label="工具名称" prop="blog_name">
          <el-input v-model="create.blog_name"></el-input>
        </el-form-item>
        <el-form-item label="工具描述" prop="blog_desc">
          <el-input v-model="create.blog_desc"></el-input>
        </el-form-item>
        <el-form-item label="工具地址" prop="blog_url">
          <el-input v-model="create.blog_url"></el-input>
        </el-form-item>
        <el-form-item label="工具图标" prop="blog_imgurl">
          <el-input v-model="create.blog_imgurl"></el-input>或
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="create.blog_imgurl" :src="create.blog_imgurl" alt="图片找不见！" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createToollink('create')">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 编辑工具 -->
    <el-dialog
      title="编辑工具"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form ref="updateForm" :rules="rules" :model="update" label-width="80px">
        <el-form-item label="工具名称" prop="blog_name">
          <el-input v-model="update.blog_name"></el-input>
        </el-form-item>
        <el-form-item label="工具描述" prop="blog_desc">
          <el-input v-model="update.blog_desc"></el-input>
        </el-form-item>
        <el-form-item label="工具地址" prop="blog_url">
          <el-input v-model="update.blog_url"></el-input>
        </el-form-item>
        <el-form-item label="工具图标" prop="blog_imgurl">
          <el-input v-model="update.blog_imgurl"></el-input>或
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="update.blog_imgurl" :src="update.blog_imgurl" alt="图片找不见！" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateToollink(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="toollinksList" border style="margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="blog_name" label="工具名称"></el-table-column>
      <el-table-column prop="blog_desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="blog_url" label="地址"></el-table-column>
      <el-table-column prop="blog_imgurl" label="图标">
        <template slot-scope="scope">
          <img
            v-if="scope.row.blog_imgurl"
            :src="scope.row.blog_imgurl"
            alt="图标不见了"
            style="width: 50px; height: 50px;"
          />
          <span v-else>没有图标</span>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.created | timeFormat}}</span>
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
      addDialog: false, // 是否显示弹窗
      updateDialog: false, // 编辑是否显示弹窗
      create: {
        blog_name: "",
        blog_desc: "",
        blog_url: "",
        blog_imgurl: ""
      }, // 添加的表单项
      update: {
        blog_name: "",
        blog_desc: "",
        blog_url: "",
        blog_imgurl: ""
      }, // 修改的表单项
      rules: {
        blog_name: [
          { required: true, message: "请输入工具名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符" }
        ],
        blog_url: [
          {
            required: true,
            message: "请输入正确的地址",
            trigger: "blur"
          },
          {
            pattern: /https?:\/{2}[^\s]*/,
            message: "地址请以http或https开头字母和数字"
          }
        ],
        blog_imgurl: [
          {
            required: false,
            message: "请上传一个地址或图标",
            trigger: "blur"
          },
          {
            pattern: /https?:\/{2}[^\s]*/,
            message: "地址请以http或https开头字母和数字"
          }
        ]
      },
      toollinksList: [] // 返回带文章数目的工具列表
    };
  },
  methods: {
    // 创建工具
    createToollink() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          await this.$http.post("/toollink", this.create);
          this.$message.success("创建工具成功！");
          this.addDialog = false;
          this.reset();
          this.getToollink();
        } else {
          return false;
        }
      });
    },

    // 图片上传
    afterUpload(res) {
      this.create.blog_imgurl = res.filename;
    },

    // 重置表单
    reset() {
      this.$refs.createForm.resetFields();
    },

    // 编辑时数据
    setCurrent(toollink) {
      this.update._id = toollink._id;
      this.update.blog_name = toollink.blog_name;
      this.update.blog_desc = toollink.blog_desc;
      this.update.blog_url = toollink.blog_url;
      this.update.blog_imgurl = toollink.blog_imgurl;
      this.updateDialog = true;
    },

    // 修改工具列表
    updateToollink(update) {
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          await this.$http.put(`/toollink/${update._id}`, this.update);
          // console.log(this.update);
          this.$message.success("修改工具成功！");
          this.updateDialog = false;
          this.getToollink();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      // console.log(row._id, row.toollink);
      this.$confirm(`是否删除工具 "${row.blog_name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/toollink/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getToollink();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取工具列表
    async getToollink() {
      const res = await this.$http("/toollink");
      this.toollinksList = res.data;
    }
  },
  created() {
    this.getToollink();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.avatar-uploader .el-upload {
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>