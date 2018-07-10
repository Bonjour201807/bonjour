<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.id===1?userData.user.avatar:userData.bot.avatar"
                   :slot="item.id===1?'rightAvatar':'leftAvatar'" />
        <span :slot="item.id===1?'after':'title'">
            <span class="content" style="color: rgba(0, 0, 0, .9)">
              {{item.message}}
              <template  v-if="item.flag===0">
                <map-gd :lng="item.lng" :lat="item.lat" vid="0"></map-gd>
              </template>
              <template  v-if="item.flag===1">
                {{item.lng}}
                {{item.lat}}
                <search-bar></search-bar>
                <map-gd :lng="item.lng" :lat="item.lat" vid="1"></map-gd>
              </template>
            </span>
        </span>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapGd from "@/components/MapGd";
import SearchBar from "@/components/SearchBar";

export default {
  name: "dialogue",
  props: ["userData"],
  components: { MapGd, SearchBar },
  computed: {
    ...mapGetters(["nowMessageList"]),
    updated() {
      this.$emit("scrollC");
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  margin-top: 10px;
  font-size: 16px;
  background-color: #f4f4f6;
  .content {
    display: inline-block;
    padding: 5px;
    background: #fff;
  }
}
</style>
