<template>
  <div class="detail-page">
    <div class="detail-header" :style="`background-image:url(${articleItem.image});`">
      <h1>{{articleItem.title}}</h1>
      <span class="detail-avatar">作者：{{articleItem.avatar}}</span>
      <span class="detail-avatar">
        标签：
        <span v-for="item in articleItem.tags" :key="item._id">
          <span class="detail-tag">{{item.tag}}</span>
        </span>
      </span>
      <span class="detail-date">发布时间：{{articleItem.updated | timeFormat}}</span>
    </div>
    <div class="detail-body">
      <div class="detail-left">
        <div class="detail-content">
          <!-- v-html="code" -->
          <div ref="content" v-html="code"></div>
        </div>
      </div>
      <div class="detail-aside">
        <h3>目录</h3>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default {
  data() {
    return {
      articleItem: {},
      code: ""
    };
  },
  created() {
    this.getArticleItem();
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    // this.code = marked(content);
    // console.log(123, marked(that.code));
  },

  methods: {
    async getArticleItem() {
      const res = await this.$http(`/article/${this.$route.params.id}`);
      this.articleItem = res.data;
      this.code = marked(res.data.body);
    }
  },
  components: {
    // MarkNav
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.detail-page {
  margin: 0 auto;
  .detail-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 300px;
    background: $color-grey;
    h1 {
      color: $color-white;
    }
    .detail-avatar {
      margin: 10px;
      color: #3495db;
      font-size: 18px;
      .detail-tag {
        margin-right: 10px;
      }
    }
    .detail-date {
      color: $color-white;
    }
  }
  .detail-body {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 10px auto;
    .detail-left {
      width: 80%;
      .detail-content {
        height: auto;
        flex: 1;
        padding: 20px;
        background: $color-white;
        border-radius: 5px;
      }
    }
    .detail-aside {
      position: sticky;
      top: 70px;
      width: 20%;
      height: 200px;
      margin-left: 10px;
      background: $color-white;
      h3 {
        text-align: center;
        margin: 10px auto;
        padding-bottom: 5px;
        border-bottom: 2px solid $color-pink;
      }
    }
  }
}
</style>
