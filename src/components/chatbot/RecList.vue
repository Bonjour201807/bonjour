<template>
<div>
  <div class="list" v-for="attraction in detail">
    <router-link
      :to="{name: 'Attraction', params: { sid: attraction.sid }}">
      <el-container>
        <el-aside width="30%">
          <img :src="attraction.images[0]" :alt="attraction.name">
        </el-aside>
        <el-container>
          <el-header><span>{{attraction.name}}</span></el-header>
          <el-main>
            <p><b>看点:&nbsp;&nbsp;</b>
              <ul>
                <li v-for="item in attraction.tags">{{ item }}&nbsp;&nbsp;</li>
              </ul>
            </p>
            <p><b>耍法:&nbsp;&nbsp;</b>
              <ul>
                <li v-for="item in attraction.comments">{{ item }}&nbsp;&nbsp;</li>
              </ul>
            </p>
          </el-main>
        </el-container>
      </el-container>
    </router-link>
  </div>
  <p></p>
  <el-button :class="next_page" style="float: right" 
  size="mini" type='primary' @click="nextPage(msgIndex)" round >下一页</el-button>
  <el-button :id="previous_page" style="display: none" 
  size="mini" type='primary' @click="previousPage(msgIndex)" round >上一页</el-button>
</div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
  name: "RecList",
  components: {},
  props: ["uid", "detail", "msgIndex"],
  data() {
    return {
      next_page: "".concat("next_page_", this.msgIndex),
      previous_page: "".concat("previous_page_", this.msgIndex)
    };
  },
  computed: {
    ...mapState({
      selectedPlace: state => state.selectPlace.selectedPlace,
      select_tags: state => state.selectTags.select_tags,
      input_tag: state => state.selectTags.input_tag
    }),
    ...mapGetters(["nowMessageList"])
  },
  methods: {
    getSpots(page_id_index, index) {
      var data = {};
      data["select_tags"] = this.select_tags;
      data["input_tag"] = this.input_tag;
      data["departure"] = this.selectedPlace.departure;
      data["adcode"] = this.selectedPlace.adcode;
      data["days"] = this.selectedPlace.days;
      axios
        .get("/spots", {
          params: {
            uid: this.uid,
            size: 3,
            from_page: page_id_index,
            data: data
          }
        })
        .then(res => {
          // 使用tags接口中的数据替换messagelist中的标签
          this.$set(
            this.nowMessageList[index].message,
            "page_id_index",
            page_id_index
          );
          this.$set(
            this.nowMessageList[index].message,
            "data",
            res.data.message.data
          );
        });
    },
    nextPage(index) {
      var obj = document.getElementById(this.previous_page);
      obj.setAttribute("style", "display: inline !important; float: right");
      var page_id_index = this.nowMessageList[index].message.page_id_index;
      if (page_id_index === undefined) {
        page_id_index = 1;
      } else {
        page_id_index = page_id_index + 1;
      }
      this.getSpots(page_id_index, index);
    },
    previousPage(index) {
      var page_id_index = this.nowMessageList[index].message.page_id_index;
      if (page_id_index <= 0) {
        page_id_index = 0;
      } else {
        page_id_index = page_id_index - 1;
      }
      this.getSpots(page_id_index, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  p {
    line-height: 1.5;
    text-align: justify;
    color: #aaa;
    font-size: 1.2rem;
    overflow: hidden;
    margin: 5px 0 0 10px;
    b {
      color: #555;
      float: left;
    }
  }
  img {
    width: 75px;
    height: 80px;
  }
  ul {
    display: inline;

    li {
      float: left;
    }
  }
}
.el-aside {
  color: #333;
  text-align: center;
  width: 75px !important;
  overflow: visible;
}
.el-header {
  color: #333;
  text-align: center;
  padding: 0 15px;
  height: auto !important;
  line-height: 18px;
  font-size: 15px;
}
.el-main {
  color: #333;
  text-align: center;
  padding: 0;
}
.el-button {
  padding: 7px 10px !important;
  margin-left: 10px;
}
</style>
