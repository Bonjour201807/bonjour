<template>
  <div class="bo-lists" ref="bo-lists">
    <div class="list-box" v-for="list in lists" @click="routerToArraction(list.sid)">
      <div class="list-pic" :style="{backgroundImage:'url('+list.pic+')'}">
        <div class="list-cover">
          {{list.desc}}
        </div>
      </div>
      <div class="list-info">
        <div class="list-left">{{list.title}}</div>
        <div class="list-right">
          <div class="list-tag" v-for="(colorTags,i) in list.colorTags" :key="i" :style="{backgroundColor:colorTags.color}">
            {{colorTags.tag}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoLists",
  props: {
    lists: {
      type: Array
    }
  },
  data() {
    return {};
  },
  created() {
    this.onScrollGet();
  },
  methods: {
    routerToArraction(sid) {
      this.$router.push({ name: "Attraction", params: { sid } });
    },
    onScrollGet() {
      let fetchState = true;
      if (window && document.documentElement) {
        window.onscroll = () => {
          let pxToBottom = 50;
          let body = document.documentElement;
          //视口高度 + Y轴滚动距离 - 滚动距离 - 视口高度
          if (
            fetchState &&
            body.scrollHeight - body.scrollTop - body.clientHeight < pxToBottom
          ) {
            fetchState = false;
            this.$store.dispatch("getListsInfo").then(datas => {
              this.$log("fetch datas success." + this.lists.length);
              fetchState = true;
            });
          }
        };
      } else {
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.bo-lists {
  display: flex;
  flex-wrap: wrap;
  .list-box {
    height: 200px;
    width: 45%;
    margin: 5px auto;
    .list-pic {
      height: 150px;
      border-radius: 8px;
      background-size: cover;
      display: flex;
      align-items: flex-end;
      // box-shadow: 3px 5px 15px;
      filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.637));
      .list-cover {
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-size: 150%;
        padding: 0 10px;
        background-color: rgba(0, 0, 0, 0.473);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        width: 100%;
      }
    }
    .list-info {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .list-left {
        margin-left: 10px;
        font-size: 180%;
        text-shadow: 5px 5px 5px silver;
      }
      .list-right {
        display: flex;
        align-items: center;
        .list-tag {
          font-size: 120%;
          line-height: 20px;
          height: 20px;
          padding: 0 5px;
          margin: 0 2px;
          border-radius: 8px;
          color: aliceblue;
          box-shadow: 1px 1px 5px #000;
        }
      }
    }
  }
}
</style>
