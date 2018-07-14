<template>
  <div class="search-bar" @click="toPageSearch">
    <!-- 根据是否进入search页面展示不同icon -->
      <div v-if="!isSearchPage" class="search-icon"></div>
      <div v-else class="back-icon">
        <van-icon name="arrow-left" @click="backIconClick"/>
      </div>
      <input @keyup="doSearch" ref="search" class="search-input" type="text" placeholder="输入搜索内容">
  </div>
</template>

<script>
import Vue from "Vue";
import { Icon } from "vant";
Vue.use(Icon);

export default {
  name: "SearchBar",
  components: {
    vanIcon: Icon
  },
  data() {
    return {
      inputFocusState: false
    };
  },
  methods: {
    // 首页点击则跳转到search页
    toPageSearch() {
      if (this.isSearchPage) {
        return false;
      } else {
        this.$router.push({ name: "Search" });
      }
    },
    backIconClick() {
      this.$router.push({ name: "Home" });
    },
    doSearch(e) {
      let searchWords = e.target.value;
      if (searchWords) {
        this.$store.dispatch("getSearchResult", searchWords);
      } else {
        this.$store.dispatch("emptySearchResult", searchWords);
      }
    }
  },
  mounted() {
    // search页输入框自动获取光标
    if (this.isSearchPage) {
      this.$refs.search.focus();
    }
  },
  computed: {
    isSearchPage() {
      return /search/.test(window.location.hash);
    }
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  }
};
</script>
<style lang='scss'>
.search-bar {
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // bg-color不支持size?        h'j
  // background: linear-gradient(45deg, red, blue) 0 0 no-repeat;
  // background-size:100% 40%;
  .search-icon {
    background: url(../assets/search.png) 5px 5px no-repeat;
    height: 40px;
    width: 10%;
    margin-right: 10px;
  }
  .back-icon {
    font-size: 170%;
    height: 40px;
    line-height: 40px;
    margin-top: 5px;
    padding-left: 10px;
    width: 10%;
  }
  .search-input {
    border: 1px solid gainsboro;
    border-top: none;
    padding: 0.5rem 0rem 0.5rem 1rem;
    width: 70%;
    height: 30px;
    border-radius: 20px;
    box-shadow: 3px 3px 3px gainsboro;
    font-size: 180%;
    //取消input点击后的高亮边框
    outline: none;
  }
}
</style>
