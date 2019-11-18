<template>
  <div id="app">
    <header-comp></header-comp>
    <!-- class="bg-img-ani" 这个是全屏渐变背景的类名 -->
    <main>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer-comp></footer-comp>
    <EyesItem />
  </div>
</template>

<script>
import EyesItem from "@/components/EyesItem";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "app",
  components: {
    HeaderComp,
    FooterComp,
    EyesItem
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  main {
    flex: 1;
    background: #f4f5f5;
  }
}
</style>
