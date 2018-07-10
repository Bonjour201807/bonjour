<template>
  <div class="home-container">
    <search-bar></search-bar>
    <bo-lists :lists="colorTags"></bo-lists>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import BoLists from "@/components/BoLists";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
    BoLists
  },
  data() {
    return {
      datas: []
    };
  },
  methods: {},
  watch: {},
  computed: {
    ...mapGetters(["colorTags"])
  },
  created() {
    this.$store.dispatch("getListsInfo");
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  background-attachment: fixed;
  // background-color: aliceblue;
}
</style>
