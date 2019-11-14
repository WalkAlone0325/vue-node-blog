<template>
  <div class="record-page">
    <ul class="record-list">
      <h2>收藏的大神文章</h2>
      <li class="record-item" v-for="n in 20" :key="n">
        <span class="item-index">{{n}}</span>
        <span class="item-date">【2019-11-6】</span>
        <span class="item-title pointer">从多线程来看 Event Loop</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.record-page {
  // width: 100%;
  margin: -20px auto 0;
  .record-list {
    width: 60%;
    margin: 0 auto;
    list-style: none;
    background: $color-f1;

    h2 {
      color: $tx-record;
      text-align: center;
      padding-top: 20px;
    }
    .record-item {
      padding: 15px;
      color: $tx-record;
      .item-index {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: $color-white;
        background: $bg-record;
        text-align: center;
        line-height: 30px;
      }
      .item-title:hover {
        color: $tx-record-hover;
      }
    }
  }
}
</style>
