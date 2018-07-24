<template>
  <div class="weather-detail">
    <!-- <el-tag size="medium">{{weatherdata.HeWeather6[0].basic.location}}天气</el-tag> -->
              <!-- <ul> -->
                <el-card v-for="(item,index) in weatherdata.HeWeather6[0].daily_forecast">
                  <div v-if="index === 0">
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
                  <img :src='"static/weather/"+item.cond_code_d+".png"' alt="" style="height:25px">
                  <span class="cond">夜晚：{{ item.cond_txt_n }}</span>
                  <div v-if="index === 0">
                    <p>
                      <el-tag type="info" size="mini">穿衣指数: </el-tag>
                      <span>{{lifedata.HeWeather6[0].lifestyle[1].txt}}</span>
                    </p>
                    <p>
                      <el-tag type="info" size="mini">出行指数: </el-tag>
                      <span>{{lifedata.HeWeather6[0].lifestyle[4].txt}}</span>
                    </p>
                    <p>
                      <el-tag type="info" size="mini">防晒指数: </el-tag>
                      <span>{{lifedata.HeWeather6[0].lifestyle[5].txt}}</span>
                    </p>
                  </div>
                </el-card>
              <!-- </ul> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "weather-detail",
  props: ["weatherdata", "lifedata"],
  data() {
    return {};
  },
  methods: {}
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
</style>