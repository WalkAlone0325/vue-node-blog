<template>
  <div class="aside-page">
    <div class="aside-tag">
      <h3>标签分类</h3>
      <hr />
      <ul>
        <li class="pointer" v-for="item in tags" :key="item._id">
          <span class="tag-name">{{ item.name }}</span>
          <span class="article-count">{{ item.count }}篇</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { name: "全部", count: 20 },
        { name: "Vue", count: 2 },
        { name: "React", count: 6 },
        { name: "Node", count: 1 },
        { name: "Js", count: 10 },
        { name: "HTML", count: 10 },
        { name: "CSS", count: 8 }
      ]
    };
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
