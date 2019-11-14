<template>
  <div id="login">
    <div class="login-content">
      <div class="login-wrap">
        <div class="flex-column">
          <div class="title">欢迎进入独行的博客后台</div>
          <div class="login-box">
            <div class="ipt">
              <img class="icon" src="./images/icon-user.png" />
              <input
                type="text"
                v-model="formData.username"
                placeholder="账户名"
              />
            </div>
            <div class="ipt">
              <img class="icon" src="./images/icon-lock.png" />
              <input
                type="password"
                v-model="formData.password"
                placeholder="登录密码"
              />
            </div>
            <div class="subbtn">
              <el-button
                type="primary"
                @click="onSubmit"
                :loading="!ableToSubmit"
                >登 录</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from "../../utils/utils";
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "admin",
        password: "123"
      },
      ableToSubmit: true,
      urlQuery: "/"
    };
  },
  created() {
    this.$notify({
      title: "",
      dangerouslyUseHTMLString: true,
      message: `我的博客地址：<a href="http://www.zhooson.cn" target="blank">http://www.zhooson.cn</>`,
      duration: 4000
    });

    if (this.$route.query.redirect) {
      this.urlQuery = this.$route.query.redirect;
    }
  },
  methods: {
    async onSubmit() {
      const { username, password } = this.formData;
      if (!username) return this.$message.error("请输入账号");
      if (!password) return this.$message.error("请输入密码");

      const token = await this.$http.post("/login", this.formData);

      Utils.setCookie("DEFAULT_TOKEN", token, 1);
      this.$router.push(this.urlQuery);
    }
  }
};
</script>
<style lang="scss" scoped>
$color: #171346;
#login {
  position: relative;
  width: 100%;
  height: 100vh;
  .login-content {
    width: 100%;
    height: 100%;
    background: url("./images/bg.jpg") no-repeat center bottom;
    background-size: cover;
  }
  .login-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 414px;
    transform: translateX(-50%);

    .flex-column {
      display: flex;
      flex: auto;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      margin-bottom: 22px;
      color: $color;
      text-align: center;
      text-indent: 3px;
      letter-spacing: 3px;
      font-weight: bold;
      font-size: 30px;
      line-height: 50px;
    }

    .login-box {
      box-sizing: border-box;
      margin-top: 30px;
      padding: 34px;
      height: 386px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.4);

      .ipt {
        display: flex;
        margin-top: 30px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);

        .icon {
          margin: 0 6px;
          width: 26px;
          height: 26px;
        }

        input {
          flex: auto;
          margin-right: 15px;
          padding: 0 20px;
          border: 0;
          background: transparent;
          color: $color;
          font-size: 18px;
          line-height: 26px;

          &:focus {
            outline: 0;
          }

          &::-webkit-input-placeholder {
            color: $color;
          }

          &:-moz-placeholder {
            color: $color;
          }

          &:-ms-input-placeholder {
            color: $color;
          }
        }
      }

      .subbtn {
        margin-top: 80px;
        outline: none;
        border: 0;
        .el-button {
          width: 100%;
          border: 0;
          background-color: $color;
          color: #fff;
          font-size: 18px;
        }
      }
    }

    .copyright {
      padding-bottom: 45px;
      color: rgba(230, 255, 253, 0.4);
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
