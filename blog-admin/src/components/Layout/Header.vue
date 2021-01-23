<template>
  <div class="myheader">
    <section class="logo" :class="{ minWidth: isCollapse }">
      <a target="_blank" href="http://blog.loner.shop/" class="logoLink">
        <img src="./images/logo.jpg" alt="logo" />
        <span v-if="!isCollapse">独行的博客</span>
      </a>
    </section>
    <section class="header-content">
      <section class="collspan dc cursor" @click="collspan">
        <i class="el-icon-s-unfold" v-if="!isCollapse" title="收起"></i>
        <i class="el-icon-s-fold" v-if="isCollapse" title="展开"></i>
      </section>
      <div class="bread">
        <BreadCrumb></BreadCrumb>
      </div>
      <!-- 全屏 -->
      <section class="fullscreen cursor dc" @click="toggleFull">
        <i class="el-icon-full-screen" title="全屏"></i>
      </section>
      <!-- 右侧菜单 -->
      <section class="cursor dc">
        <el-dropdown @command="handleDropLink" trigger="click">
          <span class="el-dropdown-link">
            {{ userInfo.account }}
            <i class="el-icon-arrow-down el-icon--right" title="菜单"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">安全退出</el-dropdown-item>
            <el-dropdown-item command="2">我的博客</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </section>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { mapGetters } from 'vuex'
import BreadCrumb from './BreadCrumb'

export default {
  name: 'myheader',
  data() {
    return {
      userInfo: {},
    }
  },
  components: {
    BreadCrumb,
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapse',
    }),
  },
  methods: {
    collspan() {
      this.$store.commit('app/updateCollapse', !this.isCollapse)
    },
    // 右侧下拉菜单
    handleDropLink(index) {
      if (index == 1) {
        localStorage.clear()
        this.$router.push('/login')
      } else if (index == 2) {
        window.open('http://blog.loner.shop/', '_blank')
      }
    },
    // 全屏操作
    toggleFull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        this.$message({
          type: 'warning',
          message: '你的浏览器不支持全屏',
        })
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.myheader {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .logo {
    overflow: hidden;
    width: 200px;
    border-bottom: 1px solid #454b61;
    background-color: #3a3f51;
    transition: width 0.3s;
    &.minWidth {
      width: 64px !important;
    }
  }
  .logoLink {
    text-decoration: none;
    display: inline-block;
    margin-left: 18px;
    height: 100%;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    line-height: 50px;
    img {
      border-radius: 50%;
      position: relative;
      top: -3px;
      margin-right: 16px;
      height: 28px;
      vertical-align: middle;
    }
  }
  .header-content {
    display: flex;
    flex: 1;
    padding: 0 20px;
    align-items: center;
    .collspan {
      i {
        font-size: 20px;
        color: #333;
      }
    }
    .bread {
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 15px;
    }
    .fullscreen {
      margin-right: 30px;
      i {
        font-size: 20px;
        color: #333;
      }
    }
  }
}
</style>
