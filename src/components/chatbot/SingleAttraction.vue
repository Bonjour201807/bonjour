<template>
  <router-link :to="{name: 'Attraction', params: { sid: message.sid }}" append>
    <mu-card style="box-shadow: none; width: 100%; max-width: 200px; max-height: 400px;margin: 0 auto;">
      <mu-card-media>
        <img :src="pic_path" :alt="message.name">
      </mu-card-media>
      <mu-card-text>
        <div style="height:75px">
          <p style="font-size: 15px"><b>{{ message.name }}</b></p>
          <p>
            <span v-for="(tag,index) in message.tags" :key="index">
              <el-button size="mini" round class='tag'>{{ tag }}</el-button>
            &nbsp;
            </span>
          </p>
          <!-- <tags v-if="message.tags" :items="message.tags"></tags> -->
        </div>
        <div class="detail">
          <p><b>耍法:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in message.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
        <div class="detail">
          <p><b>用时参考:&nbsp;&nbsp;</b>{{ message.duration }}</p>
        </div>
        <div class="detail">
          <p><b>交通:&nbsp;&nbsp;</b>{{ message.traffic }}</p>
        </div>
        <div class="detail">
          <p><b>门票:&nbsp;&nbsp;</b>{{ message.ticket }}</p>
        </div>
        <div class="detail">
          <p><b>开放时间:&nbsp;&nbsp;</b>{{ message.open }}</p>
        </div>
        <div class="detail">
          <p><b>看点/耍法:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in message.comments">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
      </mu-card-text>
    </mu-card>
  </router-link>
</template>

<script>
export default {
  name: "SingleAttraction",
  props: ["message"],
  components: {},
  data() {
    return {
      pic_path: ""
    };
  },
  created() {
    if (this.message.images.length != 0) {
      this.pic_path = this.message.images[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-card-text {
  padding: 0;
  border: none;
}
.detail {
  // margin-top: 2rem;
  margin-left: 1rem;
  // margin-left: 3.3rem;
  margin-bottom: 2.8rem;
  // min-height: 1.5em;
  font-size: 1.4rem;
  clear: left;
  b {
    float: left;
  }
  ul {
    list-style-position: outside;
    margin-left: 0;
    display: inline;

    li {
      float: left;
    }
  }
}
.tag {
  margin-bottom: 5px;
}
</style>
