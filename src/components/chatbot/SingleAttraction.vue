<template>
  <router-link :to="{name: 'Attraction', params: { id: message.id }}" append>
    <mu-card style="box-shadow: none; width: 100%; max-width: 250px; margin: 0 auto;">
      <!-- <mu-card-header> -->
        <!-- <mu-avatar slot="avatar">
          <img src="../../assets/images/uicon.jpg">
        </mu-avatar> -->
      <!-- </mu-card-header> -->
      <template v-if="mode==='list'">
        <mu-card-media :title="message.name" style="font-size: 14px;">
          <img :src="picture.filepath">
        </mu-card-media>
      </template>
      <template v-else>
        <mu-card-media :title="message.name">
          <img :src="picture.filepath">
        </mu-card-media>
      </template>
      <!-- <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title> -->
      <mu-card-text>
        <tags v-if="message.tags" :items="message.tags"></tags>
        <div class="detail">
          <p><b>耍法:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in message.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
        <div class="detail">
          <p><b>Tips:&nbsp;&nbsp;</b>
            <ul>
              <li v-for="item in message.plays">{{ item }}&nbsp;&nbsp;</li>
            </ul>
          </p>
        </div>
      </mu-card-text>
      <!-- <mu-card-actions>
        <mu-button flat>Action 1</mu-button>
        <mu-button flat>Action 2</mu-button>
      </mu-card-actions> -->
    </mu-card>
  </router-link>
</template>

<script>
import Tags from "@/components/Tags";

export default {
  name: "SingleAttraction",
  props: ["message", "mode"],
  components: { Tags },
  data() {
    return {
      picture: this.message.pic[0]
    };
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
</style>
