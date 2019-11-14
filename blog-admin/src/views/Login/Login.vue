<template>
  <div class="login-page">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import Utils from "../../utils/utils";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "admin",
        password: "123"
      },
      ableToSubmit: true
    };
  },
  created() {
    this.$notify({
      title: "",
      dangerouslyUseHTMLString: true,
      message: `我的博客地址：<a href="http://www.zhooson.cn" target="blank">http://www.zhooson.cn</>`,
      duration: 4000
    });

    // if (this.$route.query.redirect) {
    //   this.urlQuery = this.$route.query.redirect;
    // }
  },
  methods: {
    async login() {
      const { username, password } = this.formData;
      if (!username) return this.$message.error("请输入账号");
      if (!password) return this.$message.error("请输入密码");

      const res = await this.$http.post("/login", this.formData);
      console.log(res);
      if (res) {
        localStorage.token = res.data.token;
        this.$router.replace("/");
        this.$message({
          type: "success",
          message: "登录成功！"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  background: #666;
  .login-card {
    width: 25rem;
    margin: 10rem auto;
  }
}
</style>
