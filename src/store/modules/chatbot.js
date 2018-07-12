import axios from 'axios';

const state = {
  // 初始化基础数据
  data: { user: {}, bot: {} },
  // id="0"表示机器人
  activeId: 0,
  messageList: [
    {
      id: 0,
      list: [{
        id: 0, message: '你可以和我聊天', time: '4:28', lng: "116.418261",
        lat: "39.921984", flag: 1
      }]
    }
  ],
  // 消息队列副本，由于没有数据库，所以采用这样折中的方法
  messageListFB: [
    {
      id: 0,
      list: [{
        id: 0, message: '你可以和我聊天', time: '4:28', lng: "116.418261",
        lat: "39.921984", flag: 1
      }]
    }
  ]
}

const getters = {
  // 对当前消息队列中的消息进行加工，添加对应的好友资料
  nowMessageList: (state) => {
    let list = []
    state.messageList.forEach((item, index, arr) => {
      // console.log('test')
      if (item.id === state.activeId) {
        list = item.list
      }
    })
    return list
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
    // 判断信息是自己的还是ai的，然后插入聊天队列中
    if (obj.self) {
      // 信息是自己发送的
      state.messageList.forEach((item, index, arr) => {
        if (item.id === obj.id) {
          obj.id = 1
          item.list.push({ ...obj, time })
        }
      })
    } else {
      // 信息是bot发送的
      state.messageList.forEach((item, index, arr) => {
        if (item.id === obj.id) {
          item.list.push({ ...obj, time })
        }
      })
    }
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
      // params: {
      //   message,
      //   id: id
      // }
    }).then(res => {
      // 将获取到的数据赋值给先前设置的变量
      robotData = res.data
      // commit('changeList', ...robotData)
      commit('changeList', { self: false, ...robotData })
    })
    // 判断获取到的数据类型，在进行对应操作
    // if (robotData.code === 100000) {
    //   commit('changeList', { _id, message: robotData.text })
    // } else if (robotData.code === 200000) {
    //   let data = robotData.text + robotData.url
    //   commit('changeList', { _id, message: data })
    // } else if (robotData.code === 302000) {
    //   commit('changeList', { _id, message: '暂不支持此类对话' })
    // } else {
    //   commit('changeList', { _id, message: '暂不支持此类对话' })
    // }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}