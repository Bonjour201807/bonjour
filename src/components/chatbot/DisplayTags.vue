<template>
  <div class="tags">
    <div>
      <span v-for="(item,index) in items" v-if="index<4">
        <a href="#">{{item.name ? item.name : item}}</a>
      </span>
      <br>
      <span v-for="(item,index) in items" v-if="index>=4">
        <a href="#">{{item.name ? item.name : item}}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.tags {
  span {
    display: inline-block;
    margin: 1rem 0.3rem 0rem;
    font-size: 1.5rem;
  }

  a {
    display: block;
    padding: 0.3rem;
    line-height: 1.2rem;
    font-size: 0.5rem;
    border-radius: 2.8rem;
    text-align: center;
    color: #494949;
    background: #f5f5f5;
  }
}
</style>
