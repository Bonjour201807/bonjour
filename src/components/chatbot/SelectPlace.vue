<template>
<div>
  <div class="to-place">
    <p>出发地: <van-button @click="show = true">{{ departure }}</van-button></p>
    <van-popup v-model="show">
      <van-area :value="adcode" :area-list="areaList" @confirm="confirm" @cancel="show = false"/>
    </van-popup>
  </div>
  <div class="to-day">
    <p>出行天数:
      <el-input-number v-model="days" :min="1" size="mini">
      </el-input-number>
    </p>
  </div>
  <el-button class="submit" size="mini" type='primary' @click="addLocationDays(flag)" round>确定</el-button>
</div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import { Area, Button, Popup } from "vant";
Vue.use(Area);
Vue.use(Button);
Vue.use(Popup);

export default {
  name: "SelectPlace",
  props: ["uid", "local", "flag"],
  components: { Area, Button, Popup },
  data() {
    return {
      show: false,
      departure: this.local.departure.split("省")[1],
      adcode: this.local.adcode,
      days: 1
    };
  },
  created() {
    this.$store.dispatch("getAreaList");
    this.$store.dispatch("getSelectedPlace", {
      departure: this.local.departure.split("省")[1],
      adcode: this.local.adcode,
      days: this.days
    });
  },
  computed: {
    ...mapState({
      areaList: state => state.selectPlace.arealist,
      selectedPlace: state => state.selectPlace.selectedPlace
    })
  },
  methods: {
    confirm(event) {
      this.show = false;
      if (event[1].name === "县") {
        this.departure = "".concat(event[0].name, event[2].name);
      } else {
        this.departure = "".concat(event[1].name, event[2].name);
      }
      this.adcode = event[2].code;
    },
    // changeDays() {
    //   this.$store.dispatch("getSelectedPlace", {
    //     departure: this.departure,
    //     adcode: this.adcode,
    //     days: this.days
    //   });
    // },
    addLocationDays(flag) {
      // 向后台发送请求
      this.$store.dispatch("sendValue", {
        uid: this.uid,
        user_flag: flag,
        size: 9,
        message: {
          text: "".concat(this.departure, "出发, 玩", this.days, "天"),
          departure: this.departure,
          adcode: this.adcode,
          days: this.days,
          local_lng: this.local.lng,
          local_lat: this.local.lat
        }
      });
      // 更新全局数据
      this.$store.dispatch("getSelectedPlace", {
        departure: this.departure,
        adcode: this.adcode,
        days: this.days
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.submit {
  float: right;
}
</style>
