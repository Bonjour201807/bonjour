<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.self===false?'static/robot.jpg':'static/human.jpg'"
                   :slot="item.self===false?'leftAvatar':'rightAvatar'" />
        <span :slot="item.self===false?'title':'after'">
            <span :class="item.self===false?'content_bot':'content_user'"
              style="color: rgba(0, 0, 0, .9)">
              <!-- flag=0，显示纯文本信息，由于用户发送的消息没有 flag 标识而且都是纯文本
                   所以为了显示用户消息需要增加一个判断 -->
              <template v-if="item.flag===0 || item.self===true">
                <div style="max-width:250px;line-height:22px">
                  {{item.message.text}}
                </div>
              </template>
              <template v-if="item.self===true">
                <div style="max-width:250px;line-height:22px">
                  {{item.message.query}}
                </div>
              </template>
              <!-- flag=1，显示获取出发地和出行时间的组件 -->
              <template v-if="item.flag===1">
                {{item.message.text}}
                <p>请选择出发地和出行时间：</p>
                <select-place :local="local"></select-place>
                <div class="to-day">
                  <p>出行天数:
                    <el-input-number v-model="days" :min="1" size="mini">
                    </el-input-number>
                  </p>
                </div>
                <el-button size="mini" type='primary' @click="addLocationDays(item.flag)" round>确定</el-button>
              </template>
              <!-- flag=2，显示获取用户感兴趣标签的组件 -->
              <!-- 如果用户什么都没选，但是点“选好了”按钮，应该如何处理？？？ -->
              <template v-if="item.flag===2">
                {{item.message.text}}
                <p></p>
                <div>
                  <span v-for="(tag,index) in item.message.data">
                    <el-button size="mini" v-model="arr[index]"
                      :type="arr[index] === 1 ? 'primary' : 'info'"
                      @click="handleApply(index)" round class='tag'>{{tag}}
                    </el-button>
                  &nbsp;
                  </span>
                </div>
                <p></p>
                <p>其它:</p>
                <el-input type="textarea" v-model="input_tag" placeholder="输入感兴趣的景色，如森林、草甸"></el-input>
                <p></p>
                <el-button size="mini" type='primary' @click="submitTag(index, item.flag)" round >选好了</el-button>
                &nbsp; <!-- 这里的 index 是指当前显示的 item 在 nowMessageList 中的 index -->
                <el-button size="mini" type='primary' @click="changeTag(index)" round >换一批</el-button>
              </template>
              <!-- flag=3，展示推荐列表的组件 -->
              <template v-if="item.flag===3">
                <rec-list :detail="item.message.data"></rec-list>
              </template>
              <!-- flag=4，展示景点详细信息的组件，包括景点图片、标签和耍法 -->
              <template v-if="item.flag===4">
                <single-attraction :message="item.message.data[0]"></single-attraction>
              </template>
              <!-- flag=5，展示近期天气的组件 -->
              <template v-if="item.flag===5">
                <weather :message="item.message"></weather>
              </template>
              <!-- flag=6，地图展示附近景点的组件 -->
              <template v-if="item.flag===6">
                  <map-gd :lng="item.message.longitude" :lat="item.message.latitude" :path="item.message.path" :markers="item.message.markers" ></map-gd>
              </template>
            </span>
        </span>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
import MapGd from "@/components/chatbot/ChatBotMap";
import SelectPlace from "@/components/chatbot/SelectPlace";
import SingleAttraction from "@/components/chatbot/SingleAttraction";
import RecList from "@/components/chatbot/RecList";
import SearchBar from "@/components/SearchBar";
import Weather from "@/components/chatbot/ChatBotWeather";

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SelectPlace, SingleAttraction, RecList, Weather },
  data() {
    return {
      days: 0,
      arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      input_tag: "",
      hotTags: {}
    };
  },
  computed: {
    ...mapState({
      local: state => state.selectPlace.local,
      selectedPlace: state => state.selectPlace.selectedPlace
    }),
    ...mapGetters(["nowMessageList"])
  },
  methods: {
    handleApply(index) {
      this.$set(this.arr, index, 1 - this.arr[index]);
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
      // console.log(interest_tags);
      if (interest_tags.length === 0) {
        interest_tags = this.input_tag;
      } else if (this.input_tag != 0) {
        interest_tags += "、" + this.input_tag;
      }
      this.$store.dispatch("sendValue", {
        id: this.userData.user.id,
        user_flag: flag,
        message: {
          text: "".concat("感兴趣的标签：", interest_tags),
          input_tag: this.input_tag,
          select_tags: select_tags
        }
      });
      // console.log("".concat("感兴趣的标签：", interest_tags));
    },
    changeTag(index) {
      axios
        .get("http://182.254.227.188:45678/v1/api/tags", {
          params: {
            scroll_id: this.nowMessageList[index].message.scroll_id
          }
        })
        .then(res => {
          // 使用tags接口中的数据替换messagelist中的标签
          this.$set(this.nowMessageList[index].message, "data", res.data.data);
          this.arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
    },
    addLocationDays(flag) {
      this.$store.dispatch("sendValue", {
        id: this.userData.user.id,
        user_flag: flag,
        message: {
          text: "".concat(this.selectedPlace, "出发, 玩", this.days, "天"),
          departure: this.selectedPlace,
          days: this.days
        }
      });
      // console.log("".concat(this.selectedPlace, "出发, 玩", this.days, "天"));
    }
  },
  watch: {
    nowMessageList() {
      this.$nextTick(() => {
        document.body.scrollTop = document.body.scrollHeight + 16;
        // console.log(document.body.scrollTop);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  background-color: #f4f4f6;
  padding: 0;
  .content_user {
    border-radius: 10px 0px 10px 10px;
    display: inline-block;
    padding: 10px;
    background: #fff;
    max-width: 260px;
  }
  .content_bot {
    border-radius: 0px 10px 10px 10px;
    display: inline-block;
    padding: 10px;
    background: #fff;
    max-width: 260px;
    .tag {
      margin-bottom: 5px;
    }
  }
  .input {
    border-bottom: 1px solid;
  }
}
</style>
