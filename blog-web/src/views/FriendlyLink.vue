<template>
  <div class="friendly-page">
    <FriendlyComp :friendlylinkList="friendlylinkList" />
  </div>
</template>

<script>
import FriendlyComp from "../components/FriendlyComp";

export default {
  data() {
    return {
      friendlylinkList: []
    };
  },
  methods: {
    async getFriendlyLink() {
      const res = await this.$http("/friendlink");
      this.friendlylinkList = res.data;
      console.log(this.friendlylinkList);
    }
  },
  created() {
    this.getFriendlyLink();
  },
  components: {
    FriendlyComp
  }
};
</script>

<style>
</style>