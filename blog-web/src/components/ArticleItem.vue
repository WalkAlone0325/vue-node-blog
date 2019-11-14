<template>
  <router-link to="/article/1" tag="div" class="article-item">
    <div class="article-content">
      <div class="article-header">
        <h2 class="article-title pointer">Vue 源码分析</h2>
        <span class="article-tags">标签：javascript Vue</span>
      </div>
      <div class="article-img">
        <img src="../assets/images/bg1.jpg" />
      </div>
      <p class="article-intro">asasasa asasas asasas asasa</p>
    </div>
    <div class="article-info">
      <span>发布于：2019-4-20</span>
      <span>观看：2019</span>
      <span>点赞：20</span>
      <span>评论：20</span>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.article-item {
  width: 100%;
  height: 450px;
  margin-bottom: 10px;
  padding: 0 20px;
  border-radius: 6px;
  background-image: $bg-img;
  transition: all 0.5s ease-out;
  &:hover {
    box-shadow: 0 0 3px 3px $bg-hover;
    transition: all 0.5s ease-in;
    img {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.5s ease-in;
    }
  }

  .article-content {
    .article-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .article-title {
        color: $color-white;
      }
      .article-tags {
        margin-right: 10px;
        color: $tx-tag;
      }
    }
    .article-img {
      display: block;
      max-width: 100%;
      max-height: 300px;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        transition: all 0.5s ease-out;
      }
    }
    p {
      color: $color-grey;
    }
  }
  .article-info {
    color: $color-grey;
  }
}
</style>
