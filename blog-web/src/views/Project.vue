<template>
  <div class="page">
    <project-item class="project" :projectList="projectList"></project-item>
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem";

export default {
  data() {
    return {
      projectList: []
    };
  },
  methods: {
    async getProject() {
      const res = await this.$http("/project");
      this.projectList = res.data.data;
      console.log(this.projectList);
    }
  },
  created() {
    this.getProject();
  },
  components: {
    ProjectItem
  }
};
</script>

<style lang="scss">
</style>
