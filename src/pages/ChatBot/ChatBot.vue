<template>
    <div>
      <div id="header">
        <mu-appbar :title="user.name" :zDepth="0">
            <mu-icon-button icon="arrow_back" slot="left"/>
        </mu-appbar>
      </div>
      <div id="content">
        <div class="patch-1"></div>
        <dialogue :userData="userData" id="dailogue" name="dailogue"></dialogue>
        <div class="patch-2"></div>
      </div>
      <div id="footer">
          <input type="text" name="" class="input" value=""
                 v-model="todo" @keyup.enter="addTodo">
          <button type="button" name="button" @click="addTodo">发送</button>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
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
    ...mapGetters(["nowMessageList"]),
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
  created() {
    console.log(document.body.scrollTop);
    this.$nextTick(() => {
      document.body.scrollTop = document.body.scrollHeight;
      console.log(document.body.scrollTop);
    });
  },
  watch: {
    nowMessageList: function() {
      this.$nextTick(() => {
        document.body.scrollTop = document.body.scrollHeight;
        console.log(document.body.scrollTop);
      });
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
  height: 70px;
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

