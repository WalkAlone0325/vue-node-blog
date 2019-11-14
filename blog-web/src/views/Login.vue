<template>
  <div class="login-page">
    <form class="login-form">
      <div class="login">
        <span class="pointer">Login</span>
        <span>/</span>
        <span class="pointer">Sign up</span>
      </div>
      <div class="txtb">
        <i>用户名：</i>
        <input type="username" v-model="username" />
      </div>
      <div class="txtb">
        <i>密码：</i>
        <input type="password" v-model="password" />
      </div>
      <input type="submit" class="logbtn" value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.login-page {
  width: 100%;
  .login-form {
    width: 360px;
    background: $color-grey;
    height: 580px;
    padding: 80px 40px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .login {
      text-align: center;
      span {
        font-size: 30px;
        margin-bottom: 60px;
      }
    }
    .txtb {
      border-bottom: 2px solid $border-color;
      position: relative;
      margin: 30px 0;

      input {
        font-size: 15px;
        color: $input-color;
        border: none;
        width: 100%;
        outline: none;
        background: none;
        padding: 0 5px;
        height: 40px;
      }
    }
    .logbtn {
      display: block;
      width: 100%;
      height: 50px;
      border: none;
      background: $button-color;
      background-size: 200%;
      color: $color-white;
      outline: none;
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        background-position: right;
      }
    }
    .bottom-text {
      margin-top: 60px;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
