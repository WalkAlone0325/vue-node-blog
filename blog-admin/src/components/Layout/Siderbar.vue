<template>
  <div class="siderbar" :class="{'minWidth':isCollapse}">
    <el-scrollbar>
      <el-menu
        :default-active="activeRoutePath"
        class="el-menu-vertical-demo"
        background-color="#3a3f51"
        text-color="#b5b6bd"
        active-text-color="rgb(79, 148, 212)"
        mode="vertical"
        :collapse-transition="false"
        :collapse="isCollapse"
        router
      >
        <template v-for="(item, index) in routelist">
          <template v-if="!item.children || (item.children.length==0)">
            <el-menu-item :index="item.path" :key="index">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>

          <template v-if="item.children.length>0">
            <el-submenu :index="item.path" :key="index">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </template>
              <el-menu-item
                v-for="(code, codeindex) in item.children"
                :key="codeindex"
                :index="code.path"
              >
                <i :class="code.meta.icon"></i>
                {{code.meta.title}}
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "siderbar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isCollapse: "app/isCollapse",
      routelist: "app/routelist"
    }),
    activeRoutePath() {
      return this.$route.path;
    },
    childrenCode() {
      return this.item.children.filter(code => {
        return !code.hidden;
      });
    }
  },
  created() {
    // console.info(999, this.routelist);
    // this.activeRoutePath = this.$route.path;
    // console.info("routes", routes);
    // this.filterRoutes();
  },
  watch: {
    $route: function() {
      //可以监听到变化 参数 route
      // console.log("watch", route.path);
      // if (this.activeRoutePath === route.path) {
      //   return false;
      // }
    }
  },
  methods: {
    // filterRoutes() {
    //   this.routelist = routes.find(item => !item.hidden).children;
    // }
  }
};
</script>

<style scoped lang="scss">
.siderbar {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 200px;
  height: 100%;
  background: #3a3f51;
  transition: width 0.3s;
  &.minWidth {
    width: 64px !important;
  }
  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }
}
</style>
<style >
.el-menu {
  border-right: 0 !important;
}
</style>
