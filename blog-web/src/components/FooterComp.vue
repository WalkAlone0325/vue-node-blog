<template>
  <footer class="footer-page">这是底部，独行的博客</footer>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.footer-page {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color-white;
  height: 60px;
  background: $color-footer;
}
</style>
