<template>
  <div class="login-page bg-img-ani">
    <div class="login-form">
      <h2>登录</h2>
      <div class="form-input">
        <input type="text" placeholder="用户名" v-model="formData.username" />
      </div>
      <div class="form-input">
        <input type="password" placeholder="密码" v-model="formData.password" />
      </div>
      <div class="form-input">
        <input type="submit" value="登录" @click="login" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    // this.$notify({
    //   title: "",
    //   dangerouslyUseHTMLString: true,
    //   message: `我的博客地址：<a href="#" target="blank"></>`,
    //   duration: 4000
    // });
  },
  methods: {
    async login() {
      const { username, password } = this.formData;
      if (!username) return this.$message.error("请输入账号");
      if (!password) return this.$message.error("请输入密码");

      const res = await this.$http.post("/login", this.formData);
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  .login-form {
    width: 300px;
    padding: 60px 40px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .form-input {
      position: relative;
      margin: 20px 0;
      input {
        outline: none;
        height: 40px;
        padding: 0 10px;
        width: 90%;
        border: 1px solid rgba(0, 0, 0, 0.5);
        background: transparent;
        font-size: 18px;
        &[type="submit"] {
          margin-left: 10px;
          background: #e91e63;
          color: #fff;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          &:hover {
            background: #0090ff;
          }
        }
      }
    }
  }
  // .login-card {
  //   width: 25rem;
  //   margin: 10rem auto;
  // }
}
</style>
