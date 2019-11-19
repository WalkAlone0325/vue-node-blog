<template>
  <div class="article-page">
    <!-- 左侧信息栏 -->
    <tag-aside @searchTag="searchTag" :tagsList="tagsList"></tag-aside>
    <!-- 文章列表 -->
    <div class="articles-box" id="resultScroll" ref="myScrollbar">
      <!-- <loading v-if="!articleList"></loading> -->
      <article-item :articleList="articleList"></article-item>
      <!-- <article-item :articleList="articleList"></article-item> -->
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
      isLoading: false,
      page: 1, // 当前页数
      size: 5
    };
  },
  methods: {
    // 滚动事件监听
    handleScroll() {
      const $list = this.$refs.list;
      if (this.isLoading) return true;
      if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        this.getAtricle();
      }
      // 判断是否已到底部
      // if (
      //   document.documentElement.scrollTop + window.innerHeight >=
      //   document.body.offsetHeight
      // ) {
      //   if (sw == true) {
      //     sw = false;
      //     // 是否调用请求方法
      //     this.getAtricle();
      //     sw = true;
      //   }
      // }
    },

    // 过滤文章
    searchTag(val) {
      console.log(val, this.articleList);
      this.tag = val;
      this.getAtricle();
    },

    // 获取文章列表
    async getAtricle() {
      // var that = this;
      const res = await this.$http.get("/article", {
        params: {
          tag: this.tag || "",
          page: this.page,
          size: this.size
        }
      });

      this.articleList = res.data.article;

      // this.articleList = res.data.article;
      console.log(res.data);
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
    var that = this;
    // 监听滚动事件
    document
      .getElementById("resultScroll")
      .addEventListener("scroll", that.handleScroll, true);
    // window.addEventListener("scroll", this.handleScroll);
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
