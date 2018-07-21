<template>
  <div class="scroller">
    <div class="content" style="width: 100%; max-width: 350px;">
      <!-- <slot name="promItem"></slot> -->
      <ul class="hasCover">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
          <swiper-slide v-for="item in detail" class="swiper-slide">
            <router-link :to="{name: 'Attraction', params: { id: item.id }}" append>
              <single-attraction :message="item" mode="list"></single-attraction>
              <!-- <img v-if="item.images" :src="item.images.large" alt="">
              <span class="title">{{item.title}}</span> -->
              <!-- <rating v-if="item.rating" :rating="item.rating"></rating> -->
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
        centeredSlides: true,
        pagination: ".swiper-pagination",
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 13,
        pagination: {
          el: ".swiper-pagination",
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 250px;
}

.swiper-slide {
  width: 80%;
  height: 300px;
  // display: -webkit-box;
  // display: -ms-flexbox;
  // display: -webkit-flex;
  // display: flex;
  // -webkit-box-pack: center;
  // -ms-flex-pack: center;
  // -webkit-justify-content: center;
  // justify-content: center;
  // -webkit-box-align: center;
  // -ms-flex-align: center;
  // -webkit-align-items: center;
  // align-items: center;

  &.swiper-slide-active {
    img {
      margin-top: 0;
      width: 100%;
      height: 100%;
    }
  }
  img {
    display: block;
    margin: 0 auto;
    margin-top: 3.5%;
    width: 95.625%;
    height: 90.625%;
    -webkit-transition: all 1s ease 0s;
    -moz-transition: all 1s ease 0s;
    -ms-transition: all 1s ease 0s;
    -o-transition: all 1s ease 0s;
    transition: all 1s ease 0s;
  }
}

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
