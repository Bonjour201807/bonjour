<template>
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
</template>

<script>
import { mapState } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

export default {
  name: "weather-detail",
  components: { swiper, swiperSlide },
  props: ["weatherdata", "lifedata", "weatherdate"],
  data() {
    return {
      swiperOption: {
        // debugger: true,
        // centeredSlides: true,
        // pagination: ".swiper-pagination",
        // slidesPerView: "auto",
        // loop: true,
        // // spaceBetween: 13,
        pagination: {
          el: ".swiper-pagination",
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.weather-detail {
  // overflow: hidden;
  // height: auto;
  width: 250px;
  line-height: 20px;
  font-size: 13px;
  .temp {
    font-size: 20px;
  }
  // .weather {
  //   ul {
  //     padding: 0;
  //     li {
  //       margin-right: 10px;
  //       border-left: 1px solid #c8c8c8;
  //       display: inline-block;
  //       overflow: hidden;
  //       padding: 5px;
  //       text-align: center;
  //     }
  //   }
  // }
}
.swiper-slide {
  margin-bottom: 60px;
  width: 250px;
}
.swiper-pagination {
  display: inline-block;
  // margin-top: 20px;
}
</style>