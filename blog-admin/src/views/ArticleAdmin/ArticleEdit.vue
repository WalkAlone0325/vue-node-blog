<template>
  <div class="article-edit-page">
    <!-- {{id}} -->
    <el-form
      :model="articleForm"
      :rules="rules"
      ref="articleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 20px;"
    >
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="avatar">
        <el-select v-model="articleForm.avatar" placeholder="请选择作者">
          <el-option label="独行" value="独行"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="articleForm.tags" multiple placeholder="请选择文章标签">
          <el-option v-for="item in taglists" :key="item._id" :label="item.tag" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="封面" prop="image" required>
        <el-input v-model="articleForm.image"></el-input>或
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="articleForm.image" :src="articleForm.image" alt="图片找不见！" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input type="textarea" v-model="articleForm.intro"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="resource">
        <el-select v-model="articleForm.resource" placeholder="请选择状态">
          <el-option label="草稿" value="0"></el-option>
          <el-option label="发表" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="body">
        <mavon-editor v-model="articleForm.body" ref="md" @imgAdd="imgAdd" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateArticle('articleForm')">立即上传</el-button>
        <el-button style="margin-left: 200px;" @click="resetForm('articleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  props: { id: {} },
  data() {
    return {
      taglists: [],
      value: [],
      // 上面是文章标签
      articleForm: {
        title: "",
        avatar: "独行",
        tags: "",
        image: "",
        intro: "",
        resource: null, // 状态 0 草稿， 1 发表
        body: ""
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        image: [
          {
            required: true,
            message: "请选择一张封面地址或图片",
            trigger: "blur"
          },
          {
            pattern: /https?:\/{2}[^\s]*/,
            message: "地址请以http或https开头字母和数字"
          }
        ],
        resource: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        body: [{ required: true, message: "请填写文章内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    // markdowns上传图片
    async imgAdd(pos, file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await this.$http.post("/upload", formdata);
      this.$refs.md.$img2Url(pos, res.data.filename);
    },

    // 图片上传
    afterUpload(res) {
      this.articleForm.image = res.filename;
    },

    // 上传文章
    updateArticle(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$confirm(`是否上传文章 "${this.articleForm.title}"`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(async () => {
              if (this.id) {
                this.articleForm = this.articleForm;
                await this.$http.put(`/article/${this.id}`, this.articleForm);
              } else {
                await this.$http.post(`/article`, this.articleForm);
              }
              this.$message({
                type: "success",
                message: "上传成功!"
              });
              this.$router.push("/article/list");
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消上传"
              });
            });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(articleForm) {
      this.$confirm(`是否重置？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs[articleForm].resetFields();
      });
    },
    // 获取标签列表
    async getTagList() {
      const res = await this.$http.get("/tag");
      this.taglists = res.data.data.tags_list;
    },

    // 获取文章详情列表
    async getArticleItem() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.articleForm = res.data;
    }
  },
  created() {
    this.id && this.getArticleItem();
    this.getTagList();
  },
  components: {
    mavonEditor
  }
};
</script>

<style>
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
  width: 356px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 356px;
  height: 178px;
  display: block;
}
</style>