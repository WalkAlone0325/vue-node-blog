<template>
  <div class="home-page">
    <div class="home-info">
      <div class="title">github</div>
      <div class="info">
        <img class="info-img" src="../assets/images/avatar.jpg" alt />
        <h1 class="info-avatar">独行</h1>
        <span class="info-introduce">小小前端开发者</span>
      </div>
      <div class="title">掘金</div>
    </div>
    <div class="home-section">
      <div class="home-left">123</div>
      <div class="home-skill">
        <h1>我的技能：</h1>
        <div class="skill-box" v-for="item in skills" :key="item._id">
          <p>{{item.name}}</p>
          <p>{{item.progress_bar}}%</p>
          <div class="skill">
            <div class="skill-level" :style="{width: `${item.progress_bar}%`}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: []
    };
  },
  methods: {
    async getSkill() {
      const res = await this.$http("/skill");
      this.skills = res.data;
    }
  },
  created() {
    this.getSkill();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.home-page {
  // height: 1000px;

  .home-info {
    display: flex;
    height: 500px;
    // background-image: $bg-img;
    .title {
      width: 16px;
      margin: auto;
      line-height: 40 px;
      font-size: 30px;
      color: $color-white;
      word-wrap: break-word; // 英文换行
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .info-avatar {
        color: $color-grey;
      }
      .info-introduce {
        color: $tx-tag;
      }
    }
  }
  .home-section {
    width: 100%;
    // height: 700px;
    display: flex;
    background: $color-white;

    .home-left {
      flex: 1;
    }
    .home-skill {
      width: 40%;
      // height: 600px;
      padding: 30px;
      background: #333;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

      h1 {
        color: $color-white;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .skill-box {
        width: 100%;
        margin: 20px 0;

        p {
          color: $color-white;
          text-transform: uppercase;
          margin: 0 0 10px;
          font-weight: bold;
          letter-spacing: 1px;

          &:nth-child(2) {
            float: right;
            position: relative;
            top: -25px;
          }
        }
        .skill {
          background: #262626;
          padding: 4px;
          border: 1px solid #0fffb7;
          border-radius: 2px;

          .skill-level {
            background: #0fffb7;
            width: 100%;
            height: 10px;
          }
        }
      }
    }
  }
}
</style>
