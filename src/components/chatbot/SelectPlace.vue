<template>
  <div class="to-place">
    <p>出发地: <van-button @click="show = true">{{city}}</van-button></p>
    <van-popup v-model="show">
      <van-area value :area-list="areaList" @confirm="confirm" @cancel="show = false"/>
      </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import { Area, Button, Popup, Field } from "vant";
Vue.use(Area);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Field);

export default {
  name: "SelectPlace",
  props: ["local"],
  components: { Area, Button, Popup },
  data() {
    return {
      show: false,
      city: this.local.split("省")[1]
    };
  },
  created() {
    this.$store.dispatch("getAreaList");
    this.$store.dispatch("getSelectedPlace", this.local.split("省")[1]);
  },
  filters: {
    splitCity(value) {
      return value.split("省")[1];
    }
  },
  computed: {
    ...mapState({
      // local: state => state.selectPlace.local,
      areaList: state => state.selectPlace.arealist
    })
  },
  methods: {
    confirm(event) {
      this.show = false;
      // console.log(event);
      // console.log(event[1].name);
      this.$store.dispatch("getSelectedPlace", event[1].name);
      this.city = event[1].name;
    }
  }
};
</script>

