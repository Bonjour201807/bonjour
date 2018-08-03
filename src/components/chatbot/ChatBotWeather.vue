<template>
   <div class="weather-container">
        <weather-detail :weatherdata="weatherdata" :lifedata="lifedata" v-if="flag"></weather-detail>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import WeatherDetail from "./ChatBotWeatherDetail";

export default {
  name: "weather",
  props: ["destination"],
  components: { WeatherDetail },
  data() {
    return {
      weatherdata: {},
      lifedata: {},
      flag: false
    };
  },
  mounted() {
    this.getWeather();
    this.getLife();
  },
  methods: {
    getWeather() {
      axios
        .get(
          "https://free-api.heweather.com/s6/weather/forecast?&location=" +
            this.destination +
            "&key=a861917783c34b61add77450fa82a029"
        )
        .then(res => {
          var res = res.data;
          this.weatherdata = res;
          console.log(this.weatherdata);
          this.flag = true;
        });
    },
    getLife() {
      axios
        .get(
          "https://free-api.heweather.com/s6/weather/lifestyle?parameters&location=" +
            this.destination +
            "&key=a861917783c34b61add77450fa82a029"
        )
        .then(res => {
          var res = res.data;
          this.lifedata = res;
          console.log(this.lifedata);
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
.weather-container {
  height: 790px;
}
</style>