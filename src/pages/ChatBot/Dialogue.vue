<template>
  <div>
    <mu-list class="wrap" v-for="(item, index) in nowMessageList" :key="index">
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item.id===1?userData.user.avatar:userData.bot.avatar"
                   :slot="item.id===1?'rightAvatar':'leftAvatar'" />
        <span :slot="item.id===1?'after':'title'">
            <span class="content" style="color: rgba(0, 0, 0, .9)">
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
                {{item.message1}}
                <p></p>
                <div>
                  <span v-for="(tag,index) in item.tags" v-if="index%2===0">
                 <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleapply(index)" round >{{tag}}</el-button>
                 &nbsp;
                 </span>
                 </div>
                 <p></p>
                 <div>
                 <span v-for="(tag,index) in item.tags" v-if="index%2===1">
                 <el-button size="mini" v-model="arr[index]" :type="arr[index] === 1 ? 'primary' : 'info'" @click="handleapply(index)" round >{{tag}}</el-button>
                 &nbsp;
                 </span>
                 <p></p>
                 其它
                 <p></p>
                 <el-input type="textarea" v-model="inputtag" placeholder="输入感兴趣的景色，如森林、草甸"></el-input>
                 <p></p>
                 <el-button size="mini" type='primary' @click="handletag0(index)" round >提交</el-button>
                 &nbsp;
                 <el-button size="mini" type='primary' @click="handletag0(index)" round >不想选</el-button>
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
      arr: [0, 0, 0, 0, 0, 0],
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
    handleapply(index) {
      this.$set(this.arr, index, 1 - this.arr[index]);
    },
    submittag() {},
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
