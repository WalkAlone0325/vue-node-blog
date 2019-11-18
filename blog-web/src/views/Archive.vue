<template>
  <div class="archive-page">
    <div class="page_container">
      <ArchiveItem v-for="(item, key, index) in list" :key="index" :title="key" :list="item"></ArchiveItem>
    </div>
  </div>
</template>

<script>
import ArchiveItem from "../components/ArchiveItem";
import { timeFormat } from "../utils/filters";

export default {
  data() {
    return {
      archiveList: []
    };
  },
  created() {
    this.getArchive();
  },
  methods: {
    async getArchive() {
      const res = await this.$http.get("/archives");
      this.archiveList = res.data.archiveList;
      this.archiveList.map(item => {
        return {
          _id: item._id,
          title: item.title,
          created: timeFormat(item.created),
          updated: timeFormat(item.updated)
        };
      });
      // console.log(this.archiveList);
    }
  },
  computed: {
    list() {
      let json = {};
      this.archiveList.forEach(item => {
        let time = item.created.substring(0, 7);
        if (json[time] == null) {
          json[time] = [];
        }
        json[time].push(item);
      });
      return json;
    }
  },
  components: { ArchiveItem }
};
</script>

<style>
</style>