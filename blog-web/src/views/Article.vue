<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <tag-aside @searchTag="searchTag" :tagsList="tagsList"></tag-aside>
    <!-- 文章列表 -->
    <div class="articles-box">
      <article-item :articleList="articleList"></article-item>
      <!-- <loading-comp></loading-comp> -->
    </div>
  </div>
</template>

<script>
import ArticleItem from "../components/ArticleItem";
import TagAside from "../components/TagAside";
// import LoadingComp from "../components/LoadingComp";

export default {
  data() {
    return {
      articleList: [],
      tagsList: [],
      tag: ""
    };
  },
  methods: {
    // 过滤文章
    searchTag(val) {
      console.log(val, this.articleList);
      this.tag = val;
      this.getAtricle();
    },

    // 获取文章列表
    async getAtricle() {
      const res = await this.$http.get("/article", {
        params: {
          tag: this.tag || ""
        }
      });
      this.articleList = res.data.article;
      // console.log(res.data.article);
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
    // LoadingComp
  }
};
</script>

<style lang="scss">
.article-page {
  display: flex;
  align-items: flex-start;
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
