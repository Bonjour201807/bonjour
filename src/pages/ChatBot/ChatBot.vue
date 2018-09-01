<template>
    <div>
      <div id="content">
        <div class="patch-1"></div>
        <dialogue :uid="uid" id="dailogue" name="dailogue"></dialogue>
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
      uid: state => state.chatbot.data.uid,
      hotTags: state => state.searchInfo.hotTags
    }),
    userData() {
      return {
        user: this.user,
        bot: this.bot
      };
    }
  },
  watch: {
    nowMessageList() {
      this.$nextTick(() => {
        document.body.scrollTop = document.body.scrollHeight;
      });
    }
  },
  methods: {
    addUserInput() {
      if (this.text.length && this.text != "\n") {
        this.$store.dispatch("sendValue", {
          uid: this.uid,
          message: { query: this.text },
          user_flag: 0
        });
        console.log("底部输入框, uid:");
        console.log(this.uid);
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
  height: 10px;
}

.patch-2 {
  height: 75px;
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

