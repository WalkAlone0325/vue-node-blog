<template>
  <div class="record-page">
    <ul class="record-list">
      <h2>收藏的大神文章</h2>
      <li class="record-item" v-for="(item, index) in recordList" :key="item._id">
        <span class="item-index">{{index + 1}}</span>
        <span class="item-date">【{{item.updated}}】</span>
        <a :href="item.url" target="_blank" class="item-title pointer">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recordList: []
    };
  },
  methods: {
    async getrecord() {
      const res = await this.$http.get("/record");
      this.recordList = res.data.record;
      console.log(res);
    }
  },
  created() {
    this.getrecord();
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
      .item-title {
        text-decoration: none;
        &:hover {
          color: $tx-record-hover;
        }
      }
    }
  }
}
</style>
