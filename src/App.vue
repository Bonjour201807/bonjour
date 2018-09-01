<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import AMap from "vue-amap";
// Vue.use(AMap);
export default {
  name: "app",
  components: {},
  created() {
    // getLocalInfo(); // 组件创建时，进行异步数据数据请求
    this.$store.dispatch("getUid", this);
    this.$store.dispatch("getLocation");
    this.getLocalInfo();
    // AMap.service("AMap.Geolocation", function() {
    //   geolocation = new AMap.Geolocation({
    //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
    //     timeout: 10000, //超过10秒后停止定位，默认：无穷大
    //     maximumAge: 0, //定位结果缓存0毫秒，默认：0
    //     convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    //     showButton: false, //显示定位按钮，默认：true
    //     buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
    //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //     showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
    //     showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
    //     panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
    //     zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //   });
    //   geolocation.getCurrentPosition(function(status, result) {
    //     console.log(result);
    //   });
    //   AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
    // });
    // let local_position = {};
    // console.log("1");
    // function onComplete(data) {
    //   //解析定位结果
    //   console.log("test");
    //   console.log(data.position);
    //   local_positon = data.positon;
    // }
    console.log("0");
    console.log("1");
    //实例化城市查询类

    // var citysearch = new AMap.CitySearch();
    // //自动获取用户IP，返回当前城市
    // citysearch.getLocalCity(function(status, result) {
    //   console.log(status);
    //   console.log(result);
    //   if (status === "complete" && result.info === "OK") {
    //     if (result && result.city && result.bounds) {
    //       var cityinfo = result.city;
    //       console.log("您当前所在城市：" + cityinfo);
    //     }
    //   } else {
    //     console.log("定位失败：" + result.info);
    //   }
    // });
    let local_position = {};
    console.log("2");
    // function onComplete(data) {
    //   //解析定位结果
    //   console.log("test");
    //   console.log(data.position);
    //   local_positon = data.positon;
    // }
    this.$store.dispatch("getPosition", local_position);
  },
  methods: {
    getLocalInfo() {
      AMap.service(["AMap.CitySearch"], function() {
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
          console.log(status);
          console.log(result);
          if (status === "complete" && result.info === "OK") {
            if (result && result.city && result.bounds) {
              var cityinfo = result.city;
              console.log("您当前所在城市：" + cityinfo);
            }
          } else {
            console.log("定位失败：" + result.info);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
// Base setting and rest
html {
  font-size: 62.5%;
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
body {
  overflow-x: hidden;
}
.clear {
  display: inline-block;
  &:after {
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>