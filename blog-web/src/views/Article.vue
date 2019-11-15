<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <tag-aside :tagList="tagList" :count="count" @getTagArticle="getTagArticle"></tag-aside>
    <!-- 文章列表 -->
    <div class="articles-box">
      <article-item :articleList="articleList"></article-item>
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/ArticleItem";
import TagAside from "../components/TagAside";

export default {
  data() {
    return {
      articleList: [],
      tagList: [],
      count: {
        total: 0
      }
    };
  },
  methods: {
    // 获取各标签文章
    getTagArticle() {
      // this.articleList.filter((item, index, newTagList) => {});
    },
    async getAtricle() {
      const res = await this.$http("/article");
      const newArticle = [];
      res.data.article.forEach(item => {
        if (item.resource === "发表") {
          return newArticle.push(item);
        }
      });
      this.articleList = newArticle;
      this.count.total = newArticle.length;
    },
    async getTag() {
      const res = await this.$http.get("/tag");
      this.tagList = res.data;
    }
  },
  created() {
    this.getAtricle();
    this.getTag();
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

  .articles-box {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
