<template>
  <div class="dashbord">
    <h1>欢迎大哥</h1>
    <span>首页这里还没计划好写什么</span>
    <div class="chart-container" style="height: 200px; width: 500px">
      <!-- <article-chart class="article-chart"></article-chart> -->
      <tag-chart :chart-data="datacollection"></tag-chart>
    </div>
  </div>
</template>

<script>
// import ArticleChart from '@/components/vue-chart/ArticleChart.vue';
import TagChart from "@/components/vue-chart/TagChart.vue";

export default {
  name: "Dashbord",
  data() {
    return {
      loaded: false,
      tagName: [],
      articleCount: [],
      // options: {
      //   legend: {
      //     display: true,
      //     boxWidth: 5,
      //     fontSize: 16
      //   }
      // },
      datacollection: {}
    };
  },
  created() {
    this.getTag();
  },
  methods: {
    // 获取标签列表
    async getTag() {
      this.loaded = false;
      const res = await this.$http("/tag");
      const tagsList = res.data.data.tags_list;
      const numList = res.data.data.article_num_list;
      tagsList.forEach(item => {
        let temp = numList.find(i => {
          return i._id == item._id;
        });
        item.numList = temp == null ? 0 : temp.count;
      });
      res.data = tagsList.sort((a, b) => {
        return a.numList < b.numList;
      });
      // 处理成两个数组
      tagsList.forEach(item => {
        this.tagName.push(item.tag);
        this.articleCount.push(item.numList);
      });
      this.datacollection = {
        labels: this.tagName,
        datasets: [
          {
            barPercentage: 0.1,
            categoryPercentage: 0.1,
            barThickness: 14,
            // maxBarThickness: 14,
            label: "文章篇数",
            backgroundColor: "#3a3f51",
            data: this.articleCount
          }
        ]
      };
      this.loaded = true;
    }
  },
  components: {
    TagChart
  }
};
</script>

<style lang="scss" scoped>
.dashbord {
}
</style>
