import axios from 'axios';

const state = {
  // 初始化基础数据
  data: { user: {}, bot: {} },
  // id="0"表示机器人
  messageList: [
    {
      self: false, id: 0, message: '不知道去哪儿浪，交给我～：', time: '4:28',
      lng: "116.418261", lat: "39.921984", flag: 1
    }
  ],
}

const getters = {
  // 对当前消息队列中的消息进行加工，添加对应的好友资料
  nowMessageList() {
    return state.messageList
  }
}

const mutations = {
  getData(state, data) {
    // 将ajax获取到的值赋予state
    state.data = data
    // ajax状态更改为结束
    // state.isAjax = true
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
  // 这里使用了es7的async函数，相当于封装了promis的generator
  getAllData: async ({ commit }) => {
    // 声明变量用来存放之后获得的数据
    let user = {}
    let bot = {}
    await axios.get('/mock/userInfo')
      .then((res) => {
        user = res.data
      })
    await axios.get('/mock/botInfo')
      .then((res) => {
        bot = res.data
      })
    commit('getData', {
      user, bot
    })
  },
  // 聊天机器人
  sendValue: async ({ commit }, { id, message }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    let robotData = ''
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, id, message })
    await axios.get('/mock/chatmessage', {
      params: {
        message,
        id
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