<template>
  <div class="login-page bg-img-ani">
    <h1>欢迎进入博客后台管理</h1>
    <h2>登录</h2>
    <div class="login-form">
      <div class="form-input">
        <input type="text" placeholder="用户名" v-model="formData.username" />
      </div>
      <div class="form-input">
        <input type="password" placeholder="密码" v-model="formData.password" />
      </div>
      <div class="form-input">
        <input class="login-btn" type="submit" value="登录" @click="login" />
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
    this.$notify({
      title: "",
      dangerouslyUseHTMLString: true,
      message: `我的博客地址：<a style="text-decoration: none;" href="http://blog.jsw0.top" target="_blank">http://blog.jsw0.top</a>`,
      duration: 4000
    });
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    color: #f1f1f1;
    margin-top: 50px;
  }
  h2 {
    width: 120px;
    height: 110px;
    line-height: 70px;
    border-radius: 50%;
    margin: 0 auto;
    padding: 0;
    background: rgb(255, 255, 255);
    text-align: center;
    transform: translateY(70px);
  }
  .login-form {
    width: 300px;
    padding: 30px 40px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
    .form-input {
      position: relative;
      margin: 20px 0;
      input {
        display: block;
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 30px 0;
        width: 100%;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        background: transparent;
        font-size: 18px;
        &:focus {
          box-shadow: 0 0 10px #000;
        }
      }
      .login-btn {
        width: 100%;
        height: 40px;
        border: none;
        background: linear-gradient(120deg, #3498db, #8e44ad, #3498db);
        background-size: 200%;
        color: #fff;
        margin-bottom: 10px;
        outline: none;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          background-position: right;
        }
      }
    }
  }
}
</style>
