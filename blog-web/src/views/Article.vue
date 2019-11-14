<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <!-- <div class="aside-box"> -->
    <tag-aside></tag-aside>
    <!-- </div> -->
    <!-- 文章列表 -->
    <div class="articles-box">
      <article-item v-for="n in 6" :key="n"></article-item>
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/ArticleItem";
import TagAside from "../components/TagAside";

export default {
  data() {
    return {};
  },
  components: {
    ArticleItem,
    TagAside
  }
};
</script>

<style lang="scss">
.article-page {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;

  .aside-box {
  }
  .articles-box {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
