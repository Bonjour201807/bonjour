<template>
    <div>
      <div id="header">
        <mu-appbar :title="user.name" :zDepth="0">
            <!-- <el-button icon="el-icon-close" circle type="info" slot="left"/></el-button> -->
        </mu-appbar>
      </div>
      <div id="content">
        <div class="patch-1"></div>
        <dialogue :userData="userData" id="dailogue" name="dailogue"></dialogue>
        <div class="patch-2"></div>
      </div>
      <div id="footer">
          <el-input
            class="elinput"
            type="textarea"
            :autosize="{ minRows:1, maxRows: 2}"
            placeholder="请输入内容"
            v-model="text"
            size="medium"
            style="width:250px"
            @keyup.enter.native="addUserInput"/>
          <el-button class="elbutton" type="primary" name="button"  size="small"  @click="addUserInput">发送</el-button>
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
      text: ""
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
  watch: {
    nowMessageList: function() {
      this.$nextTick(() => {
        document.body.scrollTop = document.body.scrollHeight;
        // console.log(document.body.scrollTop);
      });
    }
  },
  methods: {
    addUserInput() {
      if (this.text.length && this.text != "\n") {
        this.$store.dispatch("sendValue", {
          uid: this.userData.user.uid,
          message: { query: this.text },
          user_flag: 0
        });
        // console.log(this.text);
      } else {
        console.log("不能为空");
      }
      this.text = "";
    }
  }
};
</script>

<style lang="less" scoped>
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
  height: 75px;
}

.input {
  border-color: #e2e2e2;
  /* height: 20px; */
  width: 60%;
  /* min-width: 200px; */
  margin: 15px 0;
  line-height: 30px;
}
.elinput {
  padding-top: 15px;
}

#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px;
  text-align: center;
  background: #fff;
  border-top: 1px solid #e2e2e2;
  z-index: 500;
}
</style>

