<template>
  <div class="article-item-container">
    <router-link
      class="article-item pointer"
      v-for="item in articleList"
      :key="item._id"
      :to="`/article/${item._id}`"
      tag="div"
    >
      <img v-lazy="item.image" alt="图片不见了" />
      <div class="image-content">
        <div class="content-header">
          <div class="title-info">
            <h1>{{ item.title }}</h1>
            <p>{{ item.intro }}</p>
          </div>
          <span>
            <i class="iconfont icon-biaoqian"></i>
            <span v-for="tag in item.tags" :key="tag._id">
              <span style="margin-left: 6px">{{ tag.tag }}</span>
            </span>
          </span>
        </div>
        <div class="content-footer">
          <span>
            <i class="iconfont icon-shijian"></i>
            发布于：
            {{ item.updated | timeFormat }}
          </span>
          <div class="icons">
            <div class="icon">
              <i class="iconfont icon-yanjing"></i><span>12</span>
            </div>
            <div class="icon">
              <i class="iconfont icon-dianzan"></i><span>6</span>
            </div>
            <div class="icon">
              <i class="iconfont icon-pinglun"></i><span>0</span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: { articleList: { type: Array } }
};
</script>

<style lang="scss" scoped>
.article-item-container {
  .article-item {
    position: relative;
    width: 90%;
    height: 252px;
    margin: 0 30px 15px;
    overflow: hidden;
    &:hover img {
      transform: scale(1.1);
    }
    img {
      width: 100%;
      height: 100%;
      transition: 0.4s;
    }
    .image-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      top: 0px;
      left: 0px;
      color: #fff;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);
        width: 100%;
        height: 0;
        clip-path: polygon(60% 100%, 100% 0, 100% 100%);
        transition: 0.5s;
      }
      &:hover::before {
        height: 100px;
      }
      &:hover .content-footer > .icons > .icon {
        transform: translateY(0px);
      }

      &:hover .content-header span {
        transform: translateY(0px);
      }
      .content-header {
        display: flex;
        justify-content: space-between;
        margin: 0 20px;
        .title-info {
          h1,
          p {
            margin: 20px 0;
          }
        }
        span {
          margin: 20px 0;
          text-transform: uppercase;
          transition: 0.4s;
          transform: translateY(-40px);
        }
      }
      .content-footer {
        display: flex;
        justify-content: space-between;
        margin: 0 10px 10px 20px;
        .icons {
          color: #000;
          .icon {
            display: inline-block;
            margin: 5px 10px 5px 20px;
            transform: translateY(80px);
            .iconfont {
              font-size: 16px;
            }
            &:nth-child(1) {
              transition: transform 0.4s 0.05s, color 0.4s;
            }
            &:nth-child(2) {
              transition: transform 0.4s 0.1s, color 0.4s;
            }
            &:nth-child(3) {
              transition: transform 0.4s 0.15s, color 0.4s;
            }
            &:hover {
              color: #3d8dd7;
            }
          }
        }
      }
    }
  }
}
</style>
