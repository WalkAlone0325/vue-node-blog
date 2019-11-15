<template>
  <div class="home">
    <header-comp></header-comp>
    <!-- <header></header> -->
    <main class="bg-img-ani">
      <transition mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </main>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
// @ is an alias to /src
// import LoginComp from "@/components/LoginComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "home",
  components: {
    HeaderComp,
    FooterComp
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-image: linear-gradient(120deg, #3495db, #8e44ad);

  main {
    margin-top: 60px;
    flex: 1;
    // background: #eee;
    // background: #f4f5f5;
  }
}
</style>
