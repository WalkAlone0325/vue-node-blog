<template>
  <div class="detail-page">
    <div class="detail-header">
      <h1>Vue源码解析</h1>
      <span class="detail-avatar">作者：独行</span>
      <span class="detail-date">发布时间：2019-11-6</span>
    </div>
    <div class="detail-body">
      <div class="detail-left">
        <div class="detail-img">
          <img src="../assets/images/bg1.jpg" alt />
        </div>
        <div class="detail-content" v-html="code"></div>
      </div>
      <div class="detail-aside">
        <h3>目录</h3>
        <!-- <MarkNav class="detail-nav" :source="code" headingTopOffset="0" ordered="false" /> -->
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
      code:
        "```javascript\nfunction(){\n\tconsole.log(123)\n}\n" +
        "javascript\nfunction(){\n\tconsole.log(123)\n}\n" +
        "javascript\nfunction(){\n\tconsole.log(123)\n}\n" +
        "javascript\nfunction(){\n\tconsole.log(123)\n}\n" +
        "```"
    };
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
    this.code = marked(this.code);
  },
  methods: {},
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
    height: 240px;
    background: $color-grey;
    .detail-avatar {
      margin: 10px;
      color: #3495db;
      font-size: 18px;
    }
  }
  .detail-body {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 10px auto;
    .detail-left {
      width: 80%;
      .detail-img {
        margin-bottom: 20px;
        img {
          width: 100%;
          max-width: 100%;
          max-height: 400px;
        }
      }
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
