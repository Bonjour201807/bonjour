<template>
  <div class="weather-detail">
     <div class="weather">
       <ul>
         <li v-for="item in weather_forecasts">
           <h3>周{{ num2week(item.week) }}</h3>
            <h4>{{ item.date }}</h4>
            <div class="icon i-12-m "></div>
            <div class="temp ">
              <span class="large-temp">{{ item.daytemp }}</span>
              <span class="small-temp"> / {{ item.nighttemp }}</span>
            </div>
            <span class="cond">{{ item.dayweather }}</span>
         </li>
       </ul>
     </div>
        <!-- <p>weather_lives: {{ weather_lives }}</p> -->
        <!-- <p>weather_forecasts: {{ weather_forecasts }}</p> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "weather-detail",
  props: ["citycode"],
  data() {
    return {};
  },
  methods: {
    num2week(n) {
      return "零一二三四五六七八九".charAt(n);
    }
  },
  computed: {
    // Getting Vuex State from store/modules/weather
    ...mapState({
      weather_lives: state => state.weather.weather_lives,
      weather_forecasts: state => state.weather.weather_forecasts
    })
  },
  created() {
    // Getting citycode
    const citycode = this.citycode;
    // Dispatching getCityWeatherLives
    this.$store
      .dispatch({
        type: "getCityWeatherLives",
        citycode: this.citycode
      })
      .then(res => {
        // Success handle
        console.log(this.citycode);
      });

    // Dispatching getCityWeatherForecasts
    this.$store
      .dispatch({
        type: "getCityWeatherForecasts",
        citycode: this.citycode
      })
      .then(res => {
        // Success handle
        console.log(this.citycode);
      });
  }
};
</script>

<style lang="scss" scoped>
.weather-detail {
  overflow: hidden;
  // height: 300px;
  .weather {
    ul {
      padding: 0;
      li {
        margin-right: 10px;
        border-left: 1px solid #c8c8c8;
        display: inline-block;
        overflow: hidden;
        padding: 5px;
        text-align: center;
      }
    }
  }
}
</style>