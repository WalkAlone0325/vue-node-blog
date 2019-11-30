<template>
  <div class="dashbord">
    <div class="dashbord-header">
      <h1>欢迎大哥</h1>
    </div>
    <div class="chart-container">
      <div class="tag-chart">
        <h3>各标签文章数统计</h3>
        <tag-chart :chart-data="datacollection" :options="tagoptions"></tag-chart>
      </div>
      <div class="skill-chart">
        <h3>技能统计</h3>
        <skill-chart :chart-data="skillsdata"></skill-chart>
      </div>
    </div>
  </div>
</template>

<script>
import TagChart from "@/components/vue-chart/TagChart.vue";
import SkillChart from "@/components/vue-chart/SkillChart.vue";

export default {
  name: "Dashbord",
  data() {
    return {
      loaded: false,
      // tag统计
      tagName: [],
      articleCount: [],
      tagoptions: {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        },
        layout: {
          padding: {
            left: 0,
            right: 50,
            top: 0,
            bottom: 20
          }
        },
        legend: {
          fullWidth: false,
          boxWidth: 200
        }
      },
      datacollection: {},
      // 技能统计
      skillname: [],
      skillbar: [],
      skillsdata: {}
    };
  },
  created() {
    this.getTag();
    this.getSkill();
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
            barThickness: 30,
            barValueSpacing: 5,
            barStrokeWidth: 1,
            label: "文章篇数",
            backgroundColor: this.randomHexColor(),
            data: this.articleCount
          }
        ]
      };
      this.loaded = true;
    },
    // 获取技能列表
    async getSkill() {
      const res = await this.$http("/skill");
      this.skillList = res.data;
      // 处理成两个数组
      res.data.forEach(item => {
        this.skillname.push(item.name);
        this.skillbar.push(item.progress_bar);
      });
      // 每一项的随机颜色
      const bgc = [];
      for (let i = 0; i < this.skillname.length; i++) {
        bgc.push(this.randomHexColor());
      }
      this.skillsdata = {
        labels: this.skillname,
        datasets: [
          {
            backgroundColor: bgc,
            data: this.skillbar
          }
        ]
      };
    },
    //随机生成十六进制颜色
    randomHexColor() {
      var hex = Math.floor(Math.random() * 16777216).toString(16);
      while (hex.length < 6) {
        //while循环判断hex位数，少于6位前面加0凑够6位
        hex = "0" + hex;
      }
      return "#" + hex; //返回‘#'开头16进制颜色
    }
  },
  components: {
    TagChart,
    SkillChart
  }
};
</script>

<style lang="scss" scoped>
.dashbord {
  display: flex;
  flex-direction: column;
  // .dashbord-header {
  // }
  .chart-container {
    display: flex;
    justify-content: space-around;
    .tag-chart,
    .skill-chart {
      margin-top: 20px;
      h3 {
        margin: 10px;
        padding: 0;
        text-align: center;
      }
    }
  }
}
</style>
