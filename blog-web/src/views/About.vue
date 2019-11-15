<template>
  <div class="about-page">
    <div class="about-content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
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
  }
};
</script>

<style lang="scss" scoped>
.about-page {
  width: 80%;
  margin: 0 auto;
}
</style>
