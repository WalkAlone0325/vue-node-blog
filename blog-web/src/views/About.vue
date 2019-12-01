<template>
  <div class="about-page">
    <div class="about-content" v-html="content"></div>
    <FriendlyLink />
    <CommentComp :direct="direct" />
  </div>
</template>

<script>
import FriendlyLink from "../components/FriendlyLinkCard";
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
    CommentComp,
    FriendlyLink
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
