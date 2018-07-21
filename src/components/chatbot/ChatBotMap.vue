<template>
  <!-- 智能助手地图组件，实现景点连线，景点名称坐标，添加缩放toolbar -->
   <div class="amap-wrapper">
        <el-amap :vid="mapid" :center="[lng,lat]" :path="path" :zoom="zoom" :plugin="plugin">
            <el-amap-marker :position="[lng,lat]" :isHotspot="open"></el-amap-marker>
            <el-amap-marker  v-for="(marker, index) in markers" :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" :vid="index" :label="marker.label"></el-amap-marker>
            <el-amap-polyline  :path="path" ></el-amap-polyline>
            <!-- <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :isHotspot="open" ></el-amap-marker> -->
        </el-amap>
    </div>
</template>

<script>
export default {
  name: "MapGd",
  // props: ["center","position"],
  props: ["mapid", "lng", "lat", "path", "markers", "label"],
  data() {
    return {
      vid: "amap",
      zoom: 12,
      open: true,
      plugin: [
        {
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ]
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
  width: 250px;
  margin-top: 20px;
  // border: 1px solid #c2c2c2;
}
</style>
