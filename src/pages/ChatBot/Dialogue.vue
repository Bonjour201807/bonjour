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
                  <p>请选择出发地和出行时间：</p>
                  <select-place :local="local"></select-place>
                  <div class="to-day">
                    <p>出行天数:
                      <el-input-number v-model="days" :min="1" size="mini">
                      </el-input-number>
                    </p>
                  </div>
                  <mt-button size="small" @click="addLocationDays">确定</mt-button>
              </template>
              <!-- flag=2，显示获取用户感兴趣标签的组件 -->
              <template v-if="item.flag===2">
                {{item.message.text}}
                <p></p>
                <div>
                  <span v-for="(tag,index) in item.message.tags" v-if="index%2===0">
                  <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleapply(index)" round >{{tag}}</el-button>
                  &nbsp;
                  </span>
                  </div>
                  <p></p>
                  <div>
                  <span v-for="(tag,index) in item.message.tags" v-if="index%2===1">
                  <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleapply(index)" round >{{tag}}</el-button>
                  &nbsp;
                  </span>
                  <p></p>
                  其它
                  <p></p>
                  <el-input type="textarea" v-model="inputtag" placeholder="输入感兴趣的景色，如森林、草甸"></el-input>
                  <p></p>
                  <el-button size="mini" type='primary' @click="submittag(index)" round >提交</el-button>
                  &nbsp;
                  <el-button size="mini" type='primary' @click="submittag(index)" round >不想选</el-button>
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
                {{item.message.lat}}
                {{item.message.lng}}
              </template>
              <!-- flag=6，地图展示附近景点的组件 -->
              <template v-if="item.flag===6">
                {{item.message.lng}}
                {{item.message.lat}}
                <search-bar></search-bar>
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">确定</button>
                </div>
                <map-gd :lng="item.message.lng" :lat="item.message.lat" vid="1"></map-gd>
              </template>
            </span>
        </span>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MapGd from "@/components/MapGd";
import SelectPlace from "@/components/chatbot/SelectPlace";
import SingleAttraction from "@/components/chatbot/SingleAttraction";
import RecList from "@/components/chatbot/RecList";
import SearchBar from "@/components/SearchBar";

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SelectPlace, SingleAttraction, RecList },
  data() {
    return {
      days: 0,
      arr: [0, 0, 0, 0, 0, 0],
      todo: "",
      inputtag: ""
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
    handleapply(index) {
      this.$set(this.arr, index, 1 - this.arr[index]);
    },
    submittag() {
      var interesttags = "";
      var selecttags = [];
      for (var i = 0; i < this.arr.length; ++i) {
        console.log(interesttags);
        if (this.arr[i] === 1) {
          selecttags.push(
            this.nowMessageList[this.nowMessageList.length - 1].message.tags[i]
          );
          console.log(this.nowMessageList);
          if (interesttags.length === 0)
            interesttags = this.nowMessageList[this.nowMessageList.length - 1]
              .message.tags[i];
          else
            interesttags +=
              "、" +
              this.nowMessageList[this.nowMessageList.length - 1].message.tags[
                i
              ];
        }
      }
      console.log(interesttags);
      if (interesttags.length === 0) {
        interesttags = this.inputtag;
      } else if (this.inputtag != 0) {
        interesttags += "、" + this.inputtag;
      }
      this.$store.dispatch("sendValue", {
        id: this.userData.user.id,
        message: {
          text: "".concat("感兴趣的标签：", interesttags),
          inputtag: this.inputtag,
          selecttags: selecttags
        }
      });
      console.log("".concat("感兴趣的标签：", interesttags));
    },
    addTodo() {
      if (this.todo.length) {
        this.$store.dispatch("sendValue", {
          message: { text: this.todo },
          id: this.userData.user.id
        });
      } else {
        console.log("不能为空");
      }
      this.todo = "";
    },
    addLocationDays() {
      this.$store.dispatch("sendValue", {
        id: this.userData.user.id,
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
