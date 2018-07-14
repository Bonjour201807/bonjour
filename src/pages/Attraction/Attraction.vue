<template>
  <div class="detail-view">
    <template v-if="!showLoading">
      <div class="info">
        <h2>{{attractionItem.name}}</h2>
        <scroller :slides="slides"></scroller>
        <tags v-if="attractionItem.tags" :items="attractionItem.tags"></tags>
        <div class="detail">
          <p><b>耍法:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in attractionItem.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
        <div class="detail">
          <p><b>Tips:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in attractionItem.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
        <br />
        <weather :lng="attractionItem.longitude" :lat="attractionItem.latitude"></weather>
        <map-gd :lng="attractionItem.longitude" :lat="attractionItem.latitude"></map-gd>
        <br />
      </div>
    </template>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Scroller from "@/components/Scroller";
import Tags from "@/components/Tags";
import MapGd from "@/components/MapGd";
import Weather from "@/components/Weather";
import Loading from "@/components/Loading";

export default {
  name: "attraction",
  components: { Scroller, Tags, MapGd, Weather, Loading },
  data() {
    return {
      showLoading: true
    };
  },
  computed: {
    // Getting Vuex State from store/modules/attraction
    ...mapState({
      attractionItem: state => state.attraction.attractionItem
    }),
    ...mapGetters(["slides"])
  },
  created() {
    // Getting route params
    const id = this.$route.params.id;
    // Dispatching getSingleEvent
    this.$store
      .dispatch({
        type: "getSingleEvent",
        id: id
      })
      .then(res => {
        // Success handle
        this.showLoading = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.info {
  margin: 1rem;

  h2 {
    margin: 2rem 0;
    font-weight: bold;
    color: #494949;
  }

  .badge {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    margin-bottom: 0.3rem;
    vertical-align: middle;
    line-height: 1.8rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #ff8263;
    border-radius: 0.2rem;
  }

  .poster {
    margin: 2rem auto;
    text-align: center;

    img {
      width: 100%;
      max-width: 22rem;
      height: auto;
    }
  }
}

.detail {
  margin-top: 2rem;
  margin-left: 2rem;
  // margin-left: 3.3rem;
  margin-bottom: 1rem;
  min-height: 1.5em;
  font-size: 1.4rem;
  clear: left;

  span {
    float: left;
    // margin-left: -3.3rem;
    line-height: 150%;
    color: #666666;
  }

  b {
    float: left;
  }

  ul {
    list-style-position: outside;
    margin-left: 0;
    display: inline;

    li {
      float: left;
    }
  }
}

.describe {
  h2 {
    color: #072;
  }

  .content {
    overflow: hidden;
    font-size: 1.4rem;
  }
}

.amap-wrapper {
  //   width: 90%;
  height: 300px;
}
</style>
