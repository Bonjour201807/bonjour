<template>
    <div id="dialogue">
      <div id="header">
        <mu-appbar :title="user.name" :zDepth="0">
            <mu-icon-button icon="arrow_back" slot="left"/>
        </mu-appbar>
      </div>
      <div id="content">
        <div class="patch-1"></div>
        <dialogue :userData="userData" class="dialogue"
                    name="dialogue"
                    @scrollC="scrollC"
                    ></dialogue>
        <div class="patch-2"></div>
        <!--锚点-->
        <a name="1" href="#1" ref="end"
           style="height:0;color:rgba(0,0,0,0)">.</a>
      </div>
      <div id="footer">
          <input type="text" name="" class="input" value=""
                 v-model="todo" @keyup.enter="addTodo">
          <button type="button" name="button" @click="addTodo">发送</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import dialogue from "./Dialogue";

export default {
  name: "ChatBot",
  components: { dialogue },
  data() {
    return {
      todo: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.chatbot.data.user,
      bot: state => state.chatbot.data.bot
    }),
    userData() {
      return {
        user: this.user,
        bot: this.bot
      };
    }
  },
  methods: {
    addTodo() {
      if (this.todo.length) {
        this.$store.dispatch("sendValue", {
          message: { text: this.todo },
          id: this.userData.user.id
        });
      } else {
        console.log("不能为空");
      }
      this.todo = "";
    },
    // 监听子组件事件
    scrollC() {
      // 取巧的方法，每次组件更新后模拟点击，破坏性的修改哈希值，但是简便（此处可以修改为正常控制滚动条）
      this.$refs.end.click();
    }
  }
};
</script>

<style lang="less" scoped>
#todoList {
  margin: auto;
  /* background-color: #e2e2e2; */
  /* width: 50%; */
  /* max-width: 350px; */
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e2e2e2;
  text-align: center;
  z-index: 500;
}

#content {
  padding: 0;
  position: relative;
  background-color: #f4f4f6;
  width: 100vw;
  height: 100vh;
}

.patch-1 {
  height: 64px;
}

.patch-2 {
  height: 45px;
}

.input {
  border-color: #e2e2e2;
  /* height: 20px; */
  width: 60%;
  /* min-width: 200px; */
  margin: 15px 0;
  line-height: 30px;
}

#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  text-align: center;
  background: #fff;
  border-top: 1px solid #e2e2e2;
  z-index: 500;
}
</style>

