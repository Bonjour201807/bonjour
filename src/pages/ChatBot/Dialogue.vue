<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.id===1?userData.user.avatar:userData.bot.avatar"
                   :slot="item.id===1?'rightAvatar':'leftAvatar'" />
        <span :slot="item.id===1?'after':'title'">
            <span class="content" style="color: rgba(0, 0, 0, .9)">
              <div>{{item.message}}</div>
              <!-- <template  v-if="item.flag===0">
                {{item.message}}
              </template> -->
              <template v-if="item.flag===1">
                <!-- <form> -->
                  <p>请选择出发地和出行时间：</p>
                  <div class="to-place">
                    <p>出发地: {{local | splitCity}}</p>
                    <!-- <van-area :area-list="areaList" /> -->
                  </div>
                  <div class="to-day">
                    <p>出行天数:
                      <el-input-number
                        v-model="num1"
                        :min="1"
                        :max="10"
                        label="描述文字"
                        size="mini">
                      </el-input-number>
                    </p>
                  </div>
                  <mt-button size="small" @click="addLocationDays">确定</mt-button>
                <!-- </form> -->
              </template>
              <template v-if="item.flag===2">
                {{item.lng}}
                {{item.lat}}
                <search-bar></search-bar>
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">确定</button>
                </div>
                <map-gd :lng="item.lng" :lat="item.lat" vid="1"></map-gd>
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
import { Stepper } from "vant";
import { Area } from "vant";
Vue.use(Area);

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SearchBar, VanStepper: Stepper },
  data() {
    return {
      num1: 0,
      todo: ""
    };
  },
  computed: {
    ...mapState({
      local: state => state.userInfo.local,
      ip: state => state.userInfo.ip
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
    completed(index) {
      this.todos[index].isCompleted = !this.todos[index].isCompleted;
    },
    addTodo() {
      if (this.todo.length) {
        this.$store.dispatch("sendValue", {
          message: this.todo,
          id: this.userData.bot.id
        });
      } else {
        console.log("不能为空");
      }
      this.todo = "";
    },
    addLocationDays() {
      this.$store.dispatch("sendValue", {
        message: "".concat(
          this.local.split("省")[1],
          "出发, 玩",
          this.num1,
          "天"
        ),
        id: this.userData.bot.id
      });
      console.log(
        "".concat(this.local.split("省")[1], "出发, 玩", this.num1, "天")
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
