<template>
   <div class="weather-container">
        <weather-detail :citycode="citycode" v-if="flag"></weather-detail>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import WeatherDetail from "./WeatherDetail";

export default {
  name: "weather",
  props: ["lng", "lat"],
  components: { WeatherDetail },
  data() {
    return {
      citycode: "",
      flag: false
    };
  },
  mounted() {
    this.getCityCode();
  },
  methods: {
    getCityCode() {
      axios
        .get(
          "http://restapi.amap.com/v3/geocode/regeo?location=" +
            this.lng +
            "," +
            this.lat +
            "&key=6e60e2f9398958975c2a48751f1ff952"
        )
        .then(res => {
          var res = res.data.regeocode.addressComponent.adcode;
          this.citycode = res;
          this.flag = true;
        });
    }
  }
  //   computed: {
  //       // Getting Vuex State from store/modules/weather
  //     ...mapState({
  //         citycode: state => state.weather.citycode,
  //     }),
  //   },
  //   created () {
  //       console.log('longtitude!!!!!!!!!!')
  //       console.log(this.lng)
  //       console.log('latitude!!!!!!!!!!')
  //       console.log(this.lat)
  //     // Getting longitude and latitude
  //     // const lng = this.lng
  //     // const lat = this.lat

  //     this.$store.dispatch({
  //         type: 'getCityCode',
  //         lng: this.lng,
  //         lat: this.lat
  //     }).then(res => {
  //         console.log('0')
  //         console.log(res)
  //     });
  //   }
};
</script>

<style lang="scss" scoped>
// .weather-container {
//     height: 200px;
// }
</style>