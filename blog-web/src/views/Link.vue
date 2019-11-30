<template>
  <div class="friendly-page">
    <LinkCard :friendlylinkList="friendlylinkList" :toolsLinkList="toolsLinkList" />
  </div>
</template>

<script>
import LinkCard from "../components/LinkCard";

export default {
  data() {
    return {
      friendlylinkList: [],
      toolsLinkList: []
    };
  },
  methods: {
    async getFriendlyLink() {
      const res = await this.$http("/friendlink");
      this.friendlylinkList = res.data;
    },
    async getToolsLink() {
      const res = await this.$http("/toollink");
      this.toolsLinkList = res.data;
    }
  },
  created() {
    this.getFriendlyLink();
    this.getToolsLink();
  },
  components: {
    LinkCard
  }
};
</script>

<style>
</style>