<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.self===false?'static/robot.jpg':'static/human.jpg'"
                   :slot="item.self===false?'leftAvatar':'rightAvatar'" />
        <span :slot="item.self===false?'title':'after'">
            <span :class="item.self===false?'content_bot':'content_user'"
              style="color: rgba(0, 0, 0, .9)">
              <!-- flag=0，显示纯文本信息，由于用户发送的消息没有 flag 标识而且都是纯文本
                   所以为了显示用户消息需要增加一个判断 -->
              <template v-if="item.flag===0 || item.self===true">
                <div style="max-width:250px;line-height:22px">
                  {{item.message.text}}
                </div>
              </template>
              <template v-if="item.self===true">
                <div style="max-width:250px;line-height:22px">
                  {{item.message.query}}
                </div>
              </template>
              <!-- flag=1，显示获取出发地和出行时间的组件 -->
              <template v-if="item.flag===1">
                {{item.message.text}}
                <p>请选择出发地和出行时间：</p>
                <select-place :uid="uid" :local="local" :flag="item.flag"></select-place>
              </template>
              <!-- flag=2，显示获取用户感兴趣标签的组件 -->
              <!-- 如果用户什么都没选，但是点“选好了”按钮，应该如何处理？？？ -->
              <template v-if="item.flag===2">
                {{item.message.text}}
                <p></p>
                <select-tags :uid="uid" :item="item" :msgIndex="index"></select-tags>
              </template>
              <!-- flag=3，展示推荐列表的组件 -->
              <!-- {{item}} -->
              <template v-if="item.flag===3">
                <rec-list :uid="uid" :detail="item.message.data" :msgIndex="index"></rec-list>
              </template>
              <!-- flag=4，展示景点详细信息的组件，包括景点图片、标签和耍法 -->
              <template v-if="item.flag===4">
                <single-attraction :message="item.message.data[0]"></single-attraction>
              </template>
              <!-- flag=5，展示近期天气的组件 -->
              <template v-if="item.flag===5">
                <weather :message="item.message"></weather>
              </template>
              <!-- flag=6，地图展示附近景点的组件 -->
              <template v-if="item.flag===6">
                  <map-gd :lng="item.message.longitude" :lat="item.message.latitude" :path="item.message.path" :markers="item.message.markers" ></map-gd>
              </template>
            </span>
        </span>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MapGd from "@/components/chatbot/ChatBotMap";
import SelectPlace from "@/components/chatbot/SelectPlace";
import SelectTags from "@/components/chatbot/SelectTags";
import SingleAttraction from "@/components/chatbot/SingleAttraction";
import RecList from "@/components/chatbot/RecList";
import Weather from "@/components/chatbot/ChatBotWeather";

export default {
  name: "dialogue",
  props: ["uid"],
  components: {
    MapGd,
    SelectPlace,
    SelectTags,
    SingleAttraction,
    RecList,
    Weather
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      local: state => state.selectPlace.local
    }),
    ...mapGetters(["nowMessageList"])
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  background-color: #f4f4f6;
  padding: 0;
  .content_user {
    border-radius: 10px 0px 10px 10px;
    display: inline-block;
    padding: 10px;
    background: #fff;
    max-width: 260px;
  }
  .content_bot {
    border-radius: 0px 10px 10px 10px;
    display: inline-block;
    padding: 10px;
    background: #fff;
    max-width: 260px;
  }
  .input {
    border-bottom: 1px solid;
  }
}
</style>

<style>
/* 全局样式 */
.mu-item-left {
  left: 10px !important;
}
.mu-item-right {
  right: 10px !important;
}
.mu-item.show-left {
  padding-left: 58px !important;
}
.mu-item.show-right {
  padding-right: 58px !important;
}
</style>
