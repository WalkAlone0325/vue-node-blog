<template>
  <div id="app">
    <transition mode="out-in">
      <router-view v-if="isRouterAlive" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  provode() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
