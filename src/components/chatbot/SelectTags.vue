<template>
  <div>
    <div v-for="(tag,index) in item.message.data" :key="index">
      <input type="checkbox" :id="tag" :value="tag" v-model="checkedTags">
      <label for="tag">{{tag}}</label>
    &nbsp;
    </div>
    <div>
      <span v-for="(tag,index) in item.message.data" :key="index">
        <el-button size="mini" v-model="arr[index]"
          :type="arr[index] === 1 ? 'primary' : 'info'"
          @click="handleApply(index)" round class='tag'>{{tag}}
        </el-button>
      &nbsp;
      </span>
    </div>
    <p></p>
    <p>没有你想要的标签:</p>
    <el-input type="textarea" v-model="input_tag" placeholder="输入感兴趣的景色，如森林、草甸"></el-input>
    <!-- <p>您感兴趣的标签为：{{ checkedTags }}</p>
    <p>{{ arr }}</p>
    <mu-container  class="demo-chip-wrapper">
      <mu-chip class="demo-chip" v-for="(selectedtag, index) in checkedTags" :key="tag" @delete="remove(index)" delete>{{selectedtag}}</mu-chip> -->
      <!-- <mu-button color="primary" v-if="chips.length === 0" @click="reset">reset</mu-button> -->
    <!-- </mu-container> -->
    <el-button style="float: right" size="mini" type='primary' @click="submitTag(msgIndex, item.flag)" round >选好了</el-button>
    <!-- 这里的 msgIndex 是指当前显示的 item 在 nowMessageList 中的 index -->
    <el-button :class="next_page" style="float: right" size="mini" type='primary' @click="nextPage(msgIndex)" round >下一批</el-button>
    <el-button :id="previous_page" style="display: none" size="mini" type='primary' @click="previousPage(msgIndex)" round >上一批</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
  name: "SelectTags",
  props: ["uid", "item", "msgIndex"],
  data() {
    return {
      arr: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      input_tag: "",
      hotTags: {},
      checkedTags: [],
      next_page: "".concat("next_page_", this.msgIndex),
      previous_page: "".concat("previous_page_", this.msgIndex)
    };
  },
  computed: {
    ...mapState({
      data: state => state.selectPlace.selectedPlace
    }),
    ...mapGetters(["nowMessageList"])
  },
  methods: {
    handleApply(index) {
      this.$set(this.arr, index, 1 - this.arr[index]);
    },
    remove(index) {
      this.checkedTags.splice(index, 1);
    },
    submitTag(index, flag) {
      var interest_tags = "";
      var select_tags = [];
      for (var i = 0; i < this.arr.length; ++i) {
        if (this.arr[i] === 1) {
          select_tags.push(this.nowMessageList[index].message.data[i]);
          if (interest_tags.length === 0)
            interest_tags = this.nowMessageList[index].message.data[i];
          else
            interest_tags += "、" + this.nowMessageList[index].message.data[i];
        }
      }
      if (interest_tags.length === 0) {
        interest_tags = this.input_tag;
      } else if (this.input_tag != 0) {
        interest_tags += "、" + this.input_tag;
      }
      // 向后台发送请求
      this.$store.dispatch("sendValue", {
        uid: this.uid,
        user_flag: flag,
        size: 3,
        message: {
          text: "".concat("感兴趣的标签：", interest_tags),
          input_tag: this.input_tag,
          select_tags: select_tags,
          departure: this.data.departure,
          adcode: this.data.adcode,
          days: this.data.days
        }
      });
      // 更新全局数据
      this.$store.dispatch("getSelectedTags", {
        input_tag: this.input_tag,
        select_tags: select_tags
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
      axios
        .get("/tags", {
          params: {
            uid: this.uid,
            size: 9,
            from_page: page_id_index,
            data: this.data
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
          this.arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    },
    previousPage(index) {
      var page_id_index = this.nowMessageList[index].message.page_id_index;
      if (page_id_index <= 0) {
        page_id_index = 0;
      } else {
        page_id_index = page_id_index - 1;
      }
      axios
        .get("/tags", {
          params: {
            uid: this.uid,
            size: 9,
            from_page: page_id_index,
            data: this.data
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
          this.arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  margin-bottom: 5px;
}
.el-button {
  padding: 7px 10px !important;
  margin-left: 8px;
}
</style>
