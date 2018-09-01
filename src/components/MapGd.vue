<template>
   <div class="amap-wrapper">
        <el-amap :vid="mapid" :center="[lng,lat]" :zoom="zoom">
            <el-amap-marker :position="[lng,lat]" :isHotspot="open"></el-amap-marker>
            <!-- <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :isHotspot="open" ></el-amap-marker> -->
        </el-amap>
    </div>
</template>

<script>
export default {
  name: "MapGd",
  props: ["mapid", "lng", "lat"],
  data() {
    return {
      vid: "amap",
      zoom: 12,
      open: true
      // center: [116.397142, 39.908617],
      // position: [116.397142, 39.908617],
      // markers: [{position: [116.397142, 39.908617]}]
    };
  }
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  //   width: 90%;
  height: 300px;
  margin-top: 20px;
  // border: 1px solid #c2c2c2;
}
</style>
