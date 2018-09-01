<template>
<div>
  <div class="list" v-for="attraction in items">
    <router-link
      class="thumbnail"
      :to="{name: 'Attraction', params: { sid: attraction.sid }}">
      <div class="content">
        <img src='../../static/pic/bon-1.png'>
        <h3>{{attraction.name}}</h3>
        <p><b>看点:&nbsp;&nbsp;</b>
          <ul>
            <li v-for="item in attraction.tags">{{ item }}&nbsp;&nbsp;</li>
          </ul>
        </p>
        <p><b>耍法:&nbsp;&nbsp;</b>
          <ul>
            <li v-for="item in attraction.plays">{{ item }}&nbsp;&nbsp;</li>
          </ul>
        </p>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: "list",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
  //   filters: {
  //     subStr: function(value) {
  //       let newVal = value.replace(/<.*?>/g, "");
  //       return newVal.slice(0, 30);
  //     }
  //   }
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
}
</style>
