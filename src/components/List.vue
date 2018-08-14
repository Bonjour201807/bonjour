<template>
  <div class="list">
    <template v-if="mold === 'thumbnail'" v-for="item in items">
      <router-link
        class="thumbnail"
        :to="{name: 'Attraction', params: { sid: item.sid }}">
        <div class="content">
          <img src='../../static/pic/bon-1.png'>
          <!-- <img :src="item.image_hlarge" alt="cover"> -->
          <h3>{{item.name}}</h3>
          <p><b>看点:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in item.tags">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
          <p><b>耍法:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in item.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
          <!-- <p>{{item.intro | subStr}}</p> -->
        </div>
      </router-link>
    </template>
    <!-- <template v-if="mold === 'basic'">
      <ul class="basic">
        <li v-for="item in items">
          <a href="#">
            <h3>{{item.title}}</h3>
            <div class="info">{{item.comments}}</div>
          </a>
        </li>
      </ul>
    </template> -->
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    mold: {
      type: String,
      default: "basic"
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  filters: {
    subStr: function(value) {
      let newVal = value.replace(/<.*?>/g, "");
      return newVal.slice(0, 30);
    }
  }
};
</script>

<style lang='scss' scoped>
.list {
  .thumbnail {
    position: relative;
    display: block;
    padding: 2.5rem 1.8rem 2.5rem 0;
    margin-left: 1.8rem;

    .content {
      overflow: hidden;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.6rem;
      line-height: 1.41;
      text-align: justify;
      font-size: 1.7rem;
      font-weight: 500;
      color: #494949;
    }

    p {
      line-height: 1.5;
      text-align: justify;
      color: #aaa;
      font-size: 1.2rem;
      overflow: hidden;

      b {
        color: #555;
        float: left;
      }
    }

    img {
      float: left;
      width: 25.6%;
      height: 8.678rem;
      margin-right: 2.5rem;
    }

    ul {
      display: inline;

      li {
        float: left;
      }
    }
  }

  .thumbnail ~ .thumbnail::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.1rem;
    content: "";
    background: #e3e3e3;
  }

  .basic {
    h3 {
      padding: 0;
      line-height: 1.41;
      font-size: 1.7rem;
      font-weight: 500;
      color: #494949;
    }

    .info {
      margin-top: 0.5rem;
      font-size: 1.4rem;
      color: #42bd56;
    }
  }
}
</style>
