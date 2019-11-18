<template>
  <div class="record-page">
    <ul class="record-list">
      <h2>收藏的大神文章</h2>
      <li class="record-item" v-for="(item, index) in recordList" :key="item._id">
        <span class="item-index">{{index + 1}}</span>
        <span class="item-date">【{{item.updated | timeFormat}}】</span>
        <a :href="item.url" target="_blank" class="item-title pointer">{{item.title}}</a>
      </li>
    </ul>
    <Paginator
      class="paginator-style"
      :cur_page="Number(page)"
      :page_size="Number(size)"
      :total="Number(total)"
      @jump="jump"
      v-show="total!=0"
    ></Paginator>
  </div>
</template>

<script>
import Paginator from "../components/Paginator";

export default {
  data() {
    return {
      recordList: [],
      total: 0, // 文章总数
      page: 1, // 当前页数
      size: 10, // 每页的条数
      hasMore: false
    };
  },
  methods: {
    // 跳转页面
    jump(num) {
      this.page = Number(num);
      this.get_article();
    },
    // 获取收录列表
    async getRecord() {
      const res = await this.$http("/record", {
        params: {
          page: this.page,
          size: this.size
        }
      });
      this.recordList = res.data.record;
      this.total = res.data.total;
      this.hasMore = res.data.hasMore;
    }
  },
  created() {
    this.getRecord();
  },
  components: {
    Paginator
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.record-page {
  // width: 100%;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .record-list {
    flex: 1;
    width: 70%;
    margin: 0 auto;
    list-style: none;
    background: $color-f1;

    h2 {
      margin: 15px 0;
      color: $tx-record;
      text-align: center;
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
  .paginator-style {
    width: 50%;
  }
}
</style>
