<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.self===false?userData.bot.avatar:userData.user.avatar"
                   :slot="item.self===false?'leftAvatar':'rightAvatar'" />
        <span :slot="item.self===false?'title':'after'">
            <span class="content" style="color: rgba(0, 0, 0, .9)">
              <!-- flag=0，显示纯文本信息，由于用户发送的消息没有 flag 标识而且都是纯文本
                   所以为了显示用户消息需要增加一个判断 -->
              <template v-if="item.flag===0 || item.self===true">
                {{item.message.text}}
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
                <mt-button size="small" @click="addLocationDays(item.flag)">确定</mt-button>
              </template>
              <!-- flag=2，显示获取用户感兴趣标签的组件 -->
              <!-- 可以考虑去掉‘取消’按钮，如果用户什么标签都没选也没输入，不应该返回信息，这里的逻辑需要修改 -->
              <template v-if="item.flag===2">
                {{item.message.text}}
                <p></p>
                <div>
                  <span v-for="(tag,index) in item.message.tags" v-if="index%2===0">
                  <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleApply(index)" round >{{tag}}</el-button>
                  &nbsp;
                  </span>
                  </div>
                  <p></p>
                  <div>
                  <span v-for="(tag,index) in item.message.tags" v-if="index%2===1">
                  <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleApply(index)" round >{{tag}}</el-button>
                  &nbsp;
                  </span>
                  <p></p>
                  其它
                  <p></p>
                  <el-input type="textarea" v-model="input_tag" placeholder="输入感兴趣的景色，如森林、草甸"></el-input>
                  <p></p>
                  <el-button size="mini" type='primary' @click="submitTag(index, item.flag)" round >提交</el-button>
                  &nbsp; <!-- 这里的 index 是指当前显示的 item 在 nowMessageList 中的 index -->
                  <el-button size="mini" type='primary' @click="submitTag(index, item.flag)" round >不想选</el-button>
                </div>
              </template>
              <!-- flag=3，展示推荐列表的组件 -->
              <template v-if="item.flag===3">
                <rec-list :detail="item.message"></rec-list>
              </template>
              <!-- flag=4，展示景点详细信息的组件，包括景点图片、标签和耍法 -->
              <template v-if="item.flag===4">
                <single-attraction :message="item.message"></single-attraction>
              </template>
              <!-- flag=5，展示近期天气的组件 -->
              <template v-if="item.flag===5">
                <div style="margin: 5px">
                    <iframe name="weather_inc" :src="item.message.address" width="170" height="400" frameborder="0" marginwidth="200" marginheight="0" scrolling="no"></iframe>
                </div>
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
import { mapGetters, mapState } from "vuex";
import MapGd from "@/components/chatbot/ChatBotMap";
import SelectPlace from "@/components/chatbot/SelectPlace";
import SingleAttraction from "@/components/chatbot/SingleAttraction";
import RecList from "@/components/chatbot/RecList";
import SearchBar from "@/components/SearchBar";
import Weather from "@/components/Weather";

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SelectPlace, SingleAttraction, RecList },
  data() {
    return {
      days: 0,
      arr: [0, 0, 0, 0, 0, 0],
      input_tag: ""
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
          select_tags.push(this.nowMessageList[index].message.tags[i]);
          if (interest_tags.length === 0)
            interest_tags = this.nowMessageList[index].message.tags[i];
          else
            interest_tags += "、" + this.nowMessageList[index].message.tags[i];
        }
      }
      console.log(interest_tags);
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
      console.log("".concat("感兴趣的标签：", interest_tags));
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
      console.log("".concat(this.selectedPlace, "出发, 玩", this.days, "天"));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  background-color: #f4f4f6;
  .content {
    display: inline-block;
    padding: 5px;
    background: #fff;
    max-width: 350px;
  }
  .input {
    border-bottom: 1px solid;
  }
}
</style>
