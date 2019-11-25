<template>
  <div class="about-page">
    <div class="about-content" v-html="content"></div>
    <CommentComp :direct="direct" />
  </div>
</template>

<script>
import CommentComp from "../components/CommentComp";

export default {
  data() {
    return {
      content: "",
      direct: true
    };
  },
  methods: {
    async getAbout() {
      const res = await this.$http.get("/about");
      this.content = res.data[0].body;
    }
  },
  created() {
    this.getAbout();
  },
  components: {
    CommentComp
  }
};
</script>

<style lang="scss" scoped>
.about-page {
  width: 80%;
  margin: 0 auto;
  .about-content {
    color: #000;
  }
}
</style>
