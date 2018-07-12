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
              <template  v-if="item.flag===0 || item.self===true">
                {{item.message.text}}
              </template>
              <!-- flag=1，显示获取出发地和出行时间的组件 -->
              <template v-if="item.flag===1">
                  <p>请选择出发地和出行时间：</p>
                  <div class="to-place">
                    <p>出发地: {{local | splitCity}}</p>
                    <!-- <van-area :area-list="areaList" /> -->
                  </div>
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
              <!-- flag=3，展示推荐列表的组件 -->
              <template  v-if="item.flag===3">
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">发送</button>
                </div>
              </template>
            </span>
        </span>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import MapGd from "@/components/MapGd";
import SearchBar from "@/components/SearchBar";
import { Area } from "vant";
Vue.use(Area);

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SearchBar },
  data() {
    return {
      days: 0,
      todo: ""
    };
  },
  computed: {
    ...mapState({
      local: state => state.userInfo.local,
      ip: state => state.userInfo.ip,
      messagelist: state => state.chatbot.messageList
    }),
    ...mapGetters(["nowMessageList"]),
    updated() {
      this.$emit("scrollC");
    }
  },
  filters: {
    splitCity(value) {
      return value.split("省")[1];
    }
  },
  methods: {
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
          text: "".concat(
            this.local.split("省")[1],
            "出发, 玩",
            this.days,
            "天"
          ),
          departure: this.local.split("省")[1],
          days: this.days
        }
        // message: "".concat(
        //   this.local.split("省")[1],
        //   "出发, 玩",
        //   this.days,
        //   "天"
        // ),
        // departure: this.local.split("省")[1],
        // days: this.days
      });
      console.log(
        "".concat(this.local.split("省")[1], "出发, 玩", this.days, "天")
      );
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
  }
  .input {
    border-bottom: 1px solid;
  }
}
</style>
