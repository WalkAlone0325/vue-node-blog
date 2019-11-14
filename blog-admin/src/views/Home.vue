<template>
  <div class="home">
    <header-comp></header-comp>
    <sider-bar></sider-bar>
    <content-comp></content-comp>
  </div>
</template>

<script>
import HeaderComp from "@/components/Layout/Header";
import SiderBar from "@/components/Layout/Siderbar";
import ContentComp from "@/components/Layout/Content";

export default {
  name: "home",
  components: {
    HeaderComp,
    SiderBar,
    ContentComp
  }
};
</script>
  