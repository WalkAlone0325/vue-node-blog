<template>
  <div class="tagsList-page">
    <h2>标签管理</h2>
    <el-button style="margin-left: 20px;" type="primary" @click="addDialog = true">添加标签</el-button>

    <!-- 添加标签 -->
    <el-dialog
      title="添加标签"
      :modal-append-to-body="false"
      :visible.sync="addDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form ref="createForm" :rules="rules" :model="create" label-width="80px">
        <el-form-item label="标签名称" prop="tag">
          <el-input v-model="create.tag"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="desc">
          <el-input v-model="create.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createTag('create')">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 编辑标签 -->
    <el-dialog
      title="编辑标签"
      :modal-append-to-body="false"
      :visible.sync="updateDialog"
      width="30%"
      :before-close="(done) => done()"
    >
      <el-form ref="updateForm" :rules="rules" :model="update" label-width="80px">
        <el-form-item label="标签名称" prop="tag">
          <el-input v-model="update.tag"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="desc">
          <el-input v-model="update.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateTag(update)">修 改</el-button>
      </span>
    </el-dialog>

    <!-- 表格数据列表 -->
    <el-table :data="tagsList" border style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="tag" label="标签名称">
        <template slot-scope="{row}">
          <el-tag style="margin: 0 3px; font-size: 14px" effect="dark">{{ row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="numList" label="文章数量"></el-table-column>
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
        tag: "",
        desc: ""
      }, // 添加的表单项
      update: {
        tag: "",
        desc: ""
      }, // 修改的表单项
      rules: {
        name: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符" }
        ]
      },
      tagsList: [] // 返回带文章数目的标签列表
    };
  },
  methods: {
    // 创建标签
    createTag() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          await this.$http.post("/tag", this.create);
          this.$message.success("创建标签成功！");
          this.addDialog = false;
          this.reset();
          this.getTag();
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
    setCurrent(tag) {
      console.log(tag);
      this.update._id = tag._id;
      this.update.tag = tag.tag;
      this.update.desc = tag.desc;
      this.updateDialog = true;
    },

    // 修改标签列表
    updateTag(update) {
      console.log(update._id);
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          await this.$http.put(`/tag/${update._id}`, this.update);
          console.log(this.update);
          this.$message.success("修改标签成功！");
          this.updateDialog = false;
          this.getTag();
        } else {
          return false;
        }
      });
    },

    // 删除
    removed(row) {
      console.log(row._id, row.tag);
      this.$confirm(`是否删除标签 "${row.tag}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/tag/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getTag();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取标签列表
    async getTag() {
      const res = await this.$http("/tag");
      const tagsList = res.data.data.tags_list;
      const numList = res.data.data.article_num_list;
      // console.log(numList, "123" + tagsList);
      tagsList.forEach(item => {
        let temp = numList.find(i => {
          return i._id == item._id;
        });
        item.numList = temp == null ? 0 : temp.count;
      });
      res.data = tagsList.sort((a, b) => {
        return a.numList < b.numList;
      });
      this.tagsList = tagsList;
      console.log(tagsList);
    }
  },
  created() {
    this.getTag();
  }
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>