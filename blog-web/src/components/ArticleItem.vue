<template>
  <div>
    <div v-for="item in articleList" :key="item._id" class="article-item">
      <router-link :to="`/article/${item._id}`" tag="div">
        <div class="article-content">
          <div class="article-header">
            <h2 class="article-title pointer">{{item.title}}</h2>
            <!-- <template v-for="tag in item.tags"> :key="tag._id" -->
            <span class="article-tags">
              标签：
              <span v-for="tag in item.tags" :key="tag._id">
                <span class="article-tags-tag">{{tag.tag}}</span>
              </span>
            </span>
            <!-- </template> -->
          </div>
          <div class="article-img">
            <img :src="item.image" />
          </div>
          <p class="article-intro">{{item.intro}}</p>
        </div>
        <div class="article-info">
          <span class="info-date">发布于：{{item.updated | timeFormat}}</span>
          <span class="info-wdp">
            <span>观看：2019 &nbsp;</span>
            <span>点赞：20 &nbsp;</span>
            <span>评论：20</span>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: { articleList: { type: Array } },
  // inject: ["reload"],
  data() {
    return {};
  },
  methods: {
    // toDetail(_id) {
    //   this.reload();
    //   this.$router.push(`/article/${_id}`);
    // }
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

        .article-tags-tag {
          margin-right: 6px;
        }
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
    display: flex;
    justify-content: space-between;
    color: $color-grey;
  }
}
</style>
