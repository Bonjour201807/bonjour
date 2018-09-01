<template>
  <div class="weather-container">
    <div class="weather-detail">
    <!-- <el-tag size="medium">{{weatherdata.HeWeather6[0].basic.location}}天气</el-tag> -->
      <ul>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
          <swiper-slide v-for="(item, index) in weatherdate" :key="index" class="swiper-slide">
              <div>
                <i class="el-icon-location-outline">{{weatherdata.HeWeather6[0].basic.location}}</i>
              </div>
              <h4>{{ item.date }}</h4>
              <div class="icon i-12-m "></div>
              <p class="temp ">
                <span class="large-temp">{{ item.tmp_max }}℃</span>
                <span class="small-temp"> / {{ item.tmp_min }}℃</span>
              </p >
              <img :src='"static/weather/"+item.cond_code_d+".png"' alt="" style="height:25px">
              <span class="cond">日间：{{ item.cond_txt_d }}</span>
              <span>/</span>
              <img :src='"static/weather/"+item.cond_code_n+".png"' alt="" style="height:25px">
              <span class="cond">夜晚：{{ item.cond_txt_n }}</span>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </ul>
    </div>
        <!-- <weather-detail :weatherdata="weatherdata" :weatherdate="weatherdate" :lifedata="lifedata" v-if="flag"></weather-detail> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
// import WeatherDetail from "./ChatBotWeatherDetail";

export default {
  name: "weather",
  props: ["message"],
  components: { swiper, swiperSlide },
  // components: { WeatherDetail },
  data() {
    return {
      weatherdata: {},
      lifedata: {},
      weatherdate: {},
      flag: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        }
      }
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
            this.message.local +
            "&key=1acdfb31bc4e465a96b428d43e5367e9"
        )
        .then(res => {
          var res = res.data;
          this.weatherdata = res;
          this.flag = true;
          var weatherdate_lst = this.message.start_time.split(" ");
          var weatherindex_lst = this.message.delta_time.split(" ");
          var weatherdate = weatherdate_lst[0];
          var weatherindex = parseInt(weatherindex_lst[0]);
          var arr = this.weatherdata.HeWeather6[0].daily_forecast;
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].date === weatherdate) {
              var new_arr = arr.slice(j, j + weatherindex);
              this.weatherdate = new_arr;
            }
          }
        });
    },
    getLife() {
      axios
        .get(
          "https://free-api.heweather.com/s6/weather/lifestyle?parameters&location=" +
            this.message.local +
            "&key=1acdfb31bc4e465a96b428d43e5367e9"
        )
        .then(res => {
          var res = res.data;
          this.lifedata = res;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.weather-container {
  height: 200px;
  display: inline-block;
  .weather-detail {
    width: 250px;
    line-height: 20px;
    font-size: 13px;
    .temp {
      font-size: 20px;
    }
  }
  .swiper-slide {
    margin-bottom: 60px;
    width: 250px;
  }
  .swiper-pagination {
    display: inline-block;
  }
}
</style>