import axios from 'axios';

const state = {
  // 初始化基础数据
  data: { uid: '' },
  // 机器人没有id，uid表示用户id，sid表示景点id
  messageList: [
    {
      self: false, message: { "text": "不知道去哪儿浪，交给我～" }, time: '4:28', flag: 1
    },
    // {
    //   self: false, "flag": 2,
    //   "message": {
    //     "text": "您可能感兴趣的标签：",
    //     "data": ["云海", "湖泊", "雪山", "日出", "冰川", "峡谷", "湖泊", "雪山", "日出"]
    //   }
    // },
    // {
    //   self: false, "flag": 4,
    //   "message": {
    //     "name": "\u4e50\u5c71\u5927\u4f5b",
    //     "tags": [
    //       "\u4e00\u5ea7\u5c71",
    //       "\u4e09\u6c5f\u6c47\u6d41",
    //       "\u4e00\u5c0a\u6469\u5d16"
    //     ],
    //     "plays": [
    //       "\u770b\u5927\u4f5b",
    //       "\u5750\u8239"
    //     ],
    //     "latitude": 29.55016763,
    //     "longitude": 103.7780374,
    //     "sid": "0",
    //     "images": ["static/pic/bon-1.png"]
    //   }
    // },
    // {
    //   "flag": 5,
    //   "message": {
    //     "local": "北京",
    //     "start_time": "2018-09-02 13:24:16",
    //     "delta_time": "2 days"
    //   }
    // }
  ],
}

const getters = {
  // 对当前消息队列中的消息进行加工，添加对应的好友资料
  nowMessageList() {
    console.log('*******')
    console.log(state.messageList)
    return state.messageList
  }
}

const mutations = {
  generateUid(state, data) {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxyyyyxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    state.data.uid = uuid;
  },
  // 消息队列，聊天队列处理
  changeList(state, obj) {
    let now = new Date()
    let time = `${now.getHours()}:${now.getMinutes()}`
    state.messageList.push({ ...obj, time })
  }
}

const actions = {
  // 异步获取基础数据
  getUid({ commit }, data) {
    commit("generateUid", data)
  },
  // 聊天机器人
  sendValue: async ({ commit }, { uid, size, user_flag, message }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    let robotData = ''
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, uid, size, user_flag, message })
    // await axios.get('http://139.199.192.34:8080/v1/api/chatmessage/', {
    // await axios.get('http://182.254.227.188:45678/v1/api/chatmessage', {
    await axios.get('/chatmessage', {
      params: {
        uid,
        size,
        user_flag,
        message
      }
    }).then(res => {
      // 将获取到的数据赋值给先前设置的变量
      robotData = res.data
      commit('changeList', { self: false, ...robotData })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}