<template>
  <div id="app">
    <router-view class="view"></router-view>
    <!-- <footer-bar></footer-bar> -->
  </div>
</template>

<script>
import FooterBar from "./components/FooterBar.vue";
export default {
  name: "app",
  components: {
    FooterBar
  },
  created() {
    // 组件创建时，进行异步数据数据请求
    this.$store.dispatch("getLocation");
    this.$store.dispatch("getAllData", this);
  }
};
</script>

<style lang="scss">
// Base setting and rest
html {
  font-size: 62.5%;
}

a {
  text-decoration: none;
}

ul,
li {
  list-style: none;
}

body {
  overflow-x: hidden;
}

.clear {
  display: inline-block;
  &:after {
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>