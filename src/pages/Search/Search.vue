<template>
  <div class="search-container">
    <search-bar></search-bar>
    <div class="search-index">
      <div class="block select-bar">
        <div class="to-place">
          <h2>出发地：{{local | splitCity}}</h2>
        </div>
        <div class="to-day">
          <h2>出行天数：</h2>
          <van-stepper @change="SearchDayChange"/>
        </div>
      </div>
      <!-- 根据是否有搜索结果展示不同视图 -->
      <div v-if="Object.keys(searchResult).length" class="block result">
        <h2>您是否正在查找：</h2>
        <div class="text">
          <div class="box" v-for="item in searchResult.place_arr">
            {{item.place}}
          </div>
        </div>
      </div>
      <div v-else class="block history">
        <h2>您的查询记录：</h2>
        <div class="text">
          <div class="box" v-for="item in searchHistory">
            {{item.content}}
          </div>
        </div>
      </div>
      <div class="block hotTags">
        <h1>热门标签</h1> 
        <div class="text">
          <div class="box" v-for="item in hotTags">
          {{item}}
          </div>
        </div>
      </div>
      <div class="block hotPlace">
        <h1>热门景点</h1>
        <div class="text">
           <div class="box" v-for="item in hotPlace">
            {{item.name}}          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Vue from "vue";
import { mapState } from "vuex";
import { Stepper } from "vant";
Vue.use(Stepper);

export default {
  name: "Search",
  components: {
    SearchBar,
    VanStepper: Stepper
  },
  data() {
    return {};
  },
  methods: {
    // 组件的默认参数为input的value
    SearchDayChange(day) {
      this.$store.dispatch("setSearchDay", day);
    }
  },
  watch: {},
  filters: {
    splitCity(value) {
      return value.split("省")[1];
    }
  },
  computed: {
    ...mapState({
      hotTags: state => state.searchInfo.hotTags.data,
      hotPlace: state => state.searchInfo.hotPlace,
      searchHistory: state => state.searchInfo.searchHistory,
      searchResult: state => state.searchInfo.searchResult,
      SearchDay: state => state.searchInfo.SearchDay,
      local: state => state.selectPlace.local,
      ip: state => state.selectPlace.ip
    })
  },
  created() {
    this.$store.dispatch("getHotTags", {
      scroll_id: 0
    });
    this.$store.dispatch("getHotPlace");
    this.$store.dispatch("getHistory");
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  background-attachment: fixed;
  // background-color: aliceblue;
}
.search-index {
  margin: 0 20px;
  .select-bar {
    display: flex;
    justify-content: space-between;
    .to-place {
      margin-right: 5px;
    }
    .to-day {
      line-height: 8px;
      display: flex;
      margin: 5px;
    }
  }
  .block {
    padding: 10px 0;
    .text {
      display: flex;
      flex-wrap: wrap;
      .box {
        font-size: 150%;
        padding: 5px;
        margin: 5px;
        color: rgb(82, 77, 77);
        background-color: rgb(236, 182, 120);
        border-radius: 5px;
      }
    }
  }
}
</style>
