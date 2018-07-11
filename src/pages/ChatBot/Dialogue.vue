<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.id===1?userData.user.avatar:userData.bot.avatar"
                   :slot="item.id===1?'rightAvatar':'leftAvatar'" />
        <span :slot="item.id===1?'after':'title'">
            <span class="content" style="color: rgba(0, 0, 0, .9)">
              <div>{{item.message}}</div>
              <template  v-if="item.flag===0">
                {{item.message}}
              </template>
              <template  v-if="item.flag===1">
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">确定</button>
                </div>
              </template>
              <template  v-if="item.flag===2">
                {{item.lng}}
                {{item.lat}}
                <search-bar></search-bar>
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">确定</button>
                </div>
                <map-gd :lng="item.lng" :lat="item.lat" vid="1"></map-gd>
              </template>
              <template  v-if="item.flag===3">
                <div>
                  <input type="text" name="" class="input" value=""
                    v-model="todo" @keyup.enter="addTodo">
                  <button type="button" name="button" @click="addTodo">发送</button>
                </div>
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
  data() {
    return {
      todo: ""
    };
  },
  computed: {
    ...mapGetters(["nowMessageList"]),
    updated() {
      this.$emit("scrollC");
    }
  },
  methods: {
    // Dispatching Actions
    // ...mapActions(["getAllData"]),
    completed(index) {
      this.todos[index].isCompleted = !this.todos[index].isCompleted;
    },
    addTodo() {
      if (this.todo.length) {
        this.$store.dispatch("sendValue", {
          message: this.todo,
          id: this.userData.bot.id
        });
      } else {
        console.log("不能为空");
      }
      this.todo = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 16px;
  background-color: #f4f4f6;
  .content {
    display: inline-block;
    padding: 5px;
    background: #fff;
  }
  .input {
    border-bottom: 1px solid;
  }
}
</style>
