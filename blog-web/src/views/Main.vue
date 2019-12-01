<template>
  <div class="main-page">
    <header-comp></header-comp>
    <div class="main-container">
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <SideBar />
    <EyesItem />
    <footer-comp></footer-comp>
  </div>
</template>

<script>
import EyesItem from "@/components/EyesItem";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "mainPage",
  components: {
    HeaderComp,
    FooterComp,
    EyesItem,
    SideBar
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .main-container {
    flex: 1;
    background: #f5f5f5;
  }
}
</style>
