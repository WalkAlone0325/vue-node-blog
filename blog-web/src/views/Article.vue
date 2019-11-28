<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <tag-aside @searchTag="searchTag" :total="total" :tagsList="tagsList"></tag-aside>
    <!-- 文章列表 -->
    <div class="articles-box" id="resultScroll" ref="myScrollbar">
      <loading v-show="isloading"></loading>
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
      articleList: [], // 接口数据
      tagsList: [],
      tag: "",
      hasMore: false, // 是否还有更多
      page: 1, // 当前页数
      size: 5, // 每页的条数
      total: 0,
      isloading: true
    };
  },
  methods: {
    // 滚动事件监听
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      // 如果滚动到接近底部，自动加载下一页
      if (scrollTop + clientHeight >= scrollHeight) {
        if (this.hasMore) {
          // 事件处理
          this.page += 1;
          // 数据请求
          this.isloading = true;
          this.getAtricle();
          this.isloading = false;
        }
      }
    },

    // 过滤文章
    searchTag(val) {
      this.tag = val;
      this.page = 1;
      this.articleList = [];
      this.isloading = true;
      this.getAtricle();
      this.isloading = false;
    },

    // 获取文章列表
    async getAtricle() {
      this.isloading = true;
      const res = await this.$http.get("/article", {
        params: {
          tag: this.tag || "",
          page: this.page || 1,
          size: this.size || ""
        }
      });
      res.data.article.forEach(val => {
        this.articleList = [...this.articleList, val];
      });
      this.isloading = false;
      this.total = res.data.total;
      this.hasMore = res.data.hasMore;
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
    }
  },
  created() {
    this.getAtricle();
    this.getTag();
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll);
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
  align-items: flex-start;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;

  .articles-box {
    // display: flex;
    // flex-direction: column;
    flex: 1;
  }
}
</style>
