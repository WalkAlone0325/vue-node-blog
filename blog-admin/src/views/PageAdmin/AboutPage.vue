<template>
  <div class="about-page">
    <h1>关于页面</h1>
    <vue-editor v-model="form.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
    <el-button type="primary" @click="saveBody">保存</el-button>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      form: {
        body: ""
      }
    };
  },
  methods: {
    // 上传图片
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      this.$http({
        url: "/upload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.filename;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },

    saveBody() {
      this.$confirm(`是否保存？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      }).then(async () => {
        await this.$http.put("/page/about", this.form);
        this.$message({
          type: "success",
          message: "保存成功！"
        });
      });
    },
    async getBody() {
      const res = await this.$http.get("/page/about");
      this.form.body = res.data[0].body;
    }
  },
  created() {
    this.getBody();
  },
  components: {
    VueEditor
  }
};
</script>
