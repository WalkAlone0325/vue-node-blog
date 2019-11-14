<template>
  <div class="header-page">
    <header>
      <h1>独行的博客</h1>
      <nav>
        <ul class="header-nav">
          <router-link
            tag="li"
            :to="item.path"
            class="nav-item"
            v-for="(item, index) in menuList"
            :key="index"
          >{{item.name}}</router-link>
        </ul>
      </nav>
      <div class="header-la">
        <router-link to="/login" tag="button" class="login" v-if="login">登录/注册</router-link>
        <div class="avatar" v-else></div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: true,
      menuList: [
        { name: "首页", path: "/home" },
        { name: "文章", path: "/article" },
        { name: "作品", path: "/project" },
        { name: "收录", path: "/record" },
        { name: "关于", path: "/about" },
        { name: "简历", path: "/remuse" }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.header-page {
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: $color-header;
  header {
    width: 80%;
    height: 60px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    h1 {
      flex: 1;
      margin-left: 20px;
      color: $color-white;
    }
    nav {
      .header-nav {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 10px;
        .nav-item {
          padding: 20px 30px;
          color: $color-white;
          // border: 1px solid #ccc;
          &:hover {
            color: $tx-tag;
            cursor: pointer;
          }
        }
        .router-link-active {
          color: $tx-tag;
        }
      }
    }
    .header-la {
      display: flex;
      margin-right: 5px;
      .login {
        border: none;
        background: $color-black;
        color: $color-white;
        padding: 10px;
        border-radius: 10px;
        &:hover {
          background: $color-white;
          color: $color-black;
          cursor: pointer;
        }
      }
      .avatar {
        width: 50px;
        height: 50px;
        margin: 0 20.42px;
        border-radius: 50%;
        background: $color-white;
      }
    }
  }
}
</style>
