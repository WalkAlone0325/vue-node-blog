<template>
  <div class="aside-page">
    <div class="aside-tag">
      <h3>标签分类</h3>
      <hr />
      <ul>
        <li class="pointer" @click="filterTagArticle" v-for="item in tagList" :key="item._id">
          <span class="tag-name">{{ item.tag }}</span>
          <span class="article-count">{{ count.total }}篇</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: { tagList: Array, count: Object },
  data() {
    return {};
  },
  methods: {
    // 过滤得到标签文章
    filterTagArticle() {
      this.$emit("getTagArticle", "爸爸,我知道错了");
    }
  }
};
</script>

<style lang="scss" scoped>
.aside-page {
  position: sticky;
  top: 70px;
  width: 24%;
  height: auto;
  max-height: 400px;
  margin-right: 10px;
  background: #f1f1f1;
  &:hover {
    transition: 1s ease;
    box-shadow: 0 0 5px 5px #9974c4;
  }
  .aside-tag {
    h3 {
      padding-left: 20px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        display: flex;
        font-size: 16px;
        &:hover {
          background: #3495db;
        }
        .tag-name {
          flex: 1;
          margin: 5px;
          padding: 5px 10px;
        }
        .article-count {
          margin: 5px;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>
