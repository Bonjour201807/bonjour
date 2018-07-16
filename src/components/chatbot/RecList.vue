<template>
  <div class="scroller">
    <div class="content">
      <!-- <slot name="promItem"></slot> -->
      <ul class="hasCover">
        <li v-for="item in detail">
          <router-link :to="{name: 'Attraction', params: { id: item.id }}" append>
            <single-attraction :message="item" mode="list"></single-attraction>
            <!-- <img v-if="item.images" :src="item.images.large" alt="">
            <span class="title">{{item.title}}</span> -->
            <!-- <rating v-if="item.rating" :rating="item.rating"></rating> -->
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SingleAttraction from "@/components/chatbot/SingleAttraction";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

export default {
  name: "RecList",
  components: { SingleAttraction, swiper, swiperSlide },
  props: ["detail"],
  data() {
    return {
      // slides: [
      //   "../static/pic/bon-1.png",
      //   "../static/pic/bon-2.png",
      //   "../static/pic/bon-3.png",
      //   "../static/pic/bon-4.png",
      //   "../static/pic/bon-5.png"
      // ],
      swiperOption: {
        debugger: true,
        slidesPerView: "auto",
        centeredSlides: true,
        // spaceBetween: 0,
        roundLengths: true,
        initialSlide: 1
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.scroller {
  padding-top: 1rem;
}

.header {
  height: 2.6rem;
  line-height: 2.6rem;
  padding: 0 1.6rem;

  a {
    float: right;
    font-size: 1.44rem;
    &:last-child {
      color: #42bd56;
    }
  }

  h2 {
    display: inline-block;
  }
}

.content {
  box-sizing: content-box;
}

.hasCover {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;

  li {
    display: inline-block;
    width: 10rem;
    margin-left: 1rem;
  }

  // li:first-child {
  // padding-left: 0.8rem;
  // }

  // img {
  //   height: 15rem;
  // }
}

.onlyString {
  overflow-x: auto;
  white-space: nowrap;

  li {
    display: inline-block;
    margin: 0 0 0.8rem 1.6rem;
    font-size: 1.6rem;
    border: solid 0.1rem;
    border-radius: 0.4rem;
    vertical-align: middle;
  }

  a {
    height: 5rem;
    line-height: 5rem;
    padding: 0 2.4rem;
    letter-spacing: 0.16rem;
    overflow: auto;
    display: block;
    text-align: center;
  }

  li:empty {
    width: 100%;
    display: block;
    height: 0.1rem;
    border: 0;
    margin: 0;
  }
}
</style>
