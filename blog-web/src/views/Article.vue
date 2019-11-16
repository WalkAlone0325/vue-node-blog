<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <!-- :tagList="tagList" :article_count="article_count" -->
    <tag-aside :tagsList="tagsList"></tag-aside>
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
      tagsList: []
    };
  },
  methods: {
    // 获取文章列表
    async getAtricle() {
      const res = await this.$http("/article");
      this.articleList = res.data.article;
    },
    async getTag() {
      const res = await this.$http.get("/tag");
      // 处理数据，将两个数组合并并加入标签的文章数
      const tagsList = res.data.data.tag_lists;
      const numList = res.data.data.num_list;
      tagsList.forEach(item => {
        let temp = numList.find(i => {
          return i._id == item._id;
        });
        item.numList = temp == null ? 0 : temp.count;
      });
      res.data = tagsList.sort((a, b) => {
        return a.numList < b.numList;
      });
      this.tagsList = tagsList;
      console.log(tagsList);
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
