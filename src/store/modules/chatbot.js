import axios from 'axios';

const state = {
  // 初始化基础数据
  data: { user: {}, bot: {} },
  // 机器人没有id，uid表示用户id，sid表示景点id
  messageList: [
    {
      self: false, message: { "text": "不知道去哪儿浪，交给我～" }, time: '4:28', flag: 1
    },
    // {
    //   self: false, "flag": 2,
    //   "message": {
    //     "text": "您可能感兴趣的标签：",
    //     "data": ["云海", "湖泊", "雪山", "日出", "冰川", "峡谷", "湖泊", "雪山", "日出", "冰川"]
    //   }
    // },
    // {
    //   self: false,
    //   "flag": 3,
    //   "message": [
    //     {
    //       "sid": 0,
    //       "name": "\u4e50\u5c71\u5927\u4f5b",
    //       "tags": [
    //         "\u4e00\u5ea7\u5c71",
    //         "\u4e09\u6c5f\u6c47\u6d41",
    //         "\u4e00\u5c0a\u6469\u5d16"
    //       ],
    //       "plays": [
    //         "\u770b\u5927\u4f5b",
    //         "\u5750\u8239"
    //       ],
    //       "pic_path": "/static/pic/bon-1.png"
    //     },
    //     {
    //       "sid": 0,
    //       "name": "\u9752\u57ce\u5c71",
    //       "tags": [
    //         "\u6e05\u5e7d",
    //         "\u9053\u5bb6\u6587\u5316"
    //       ],
    //       "plays": [
    //         "\u722c\u5c71",
    //         "\u4e2d\u9014\u6e56\u6cca\u53ef\u5750\u8239",
    //         "\u611f\u53d7\u9053\u6559\u6587\u5316"
    //       ],
    //       "pic_path": "/static/pic/bon-2.png"
    //     },
    //     {
    //       "sid": 0,
    //       "name": "\u7a3b\u57ce\u4e9a\u4e01",
    //       "tags": [
    //         "\u96ea\u5c71",
    //         "\u4e94\u8272\u6d77",
    //         "\u725b\u5976\u6d77",
    //         "\u73cd\u73e0\u6d77",
    //         "\u7ea2\u8349\u6ee9",
    //         "\u6d1b\u7ed2\u725b\u573a"
    //       ],
    //       "plays": [
    //         "\u5f92\u6b65",
    //         "\u767b\u5c71\u770b\u6d77\u5b50"
    //       ],
    //       "pic_path": "/static/pic/bon-3.png"
    //     },
    //     {
    //       "sid": 0,
    //       "name": "\u5bbd\u7a84\u5df7\u5b50",
    //       "tags": [
    //         "\u6587\u827a",
    //         "\u8001\u6210\u90fd",
    //         "\u6162\u8282\u594f"
    //       ],
    //       "plays": [
    //         "\u62cd\u7167",
    //         "\u638f\u8033\u6735",
    //         "\u559d\u8336",
    //         "\u901b\u5403"
    //       ],
    //       "pic_path": "/static/pic/bon-4.png"
    //     },
    //     {
    //       "sid": 0,
    //       "name": "\u8700\u5357\u7af9\u6d77",
    //       "tags": [
    //         "\u7af9\u6d77",
    //         "\u5929\u7136\u6c27\u5427",
    //         "\u5367\u864e\u85cf\u9f99",
    //         "\u5341\u9762\u57cb\u4f0f"
    //       ],
    //       "plays": [
    //         "\u770b\u7af9\u6797",
    //         "\u559d\u8336\u6253\u9ebb\u5c06",
    //         "\u5403\u7b0b\u83dc"
    //       ],
    //       "pic_path": "/static/pic/bon-5.png"
    //     }
    //   ]
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
    //     "pic_path": "/static/pic/bon-1.png"
    //   }
    // },
    // {
    //   self: false, "flag": 6,
    //   "message": {
    //     "latitude": 29.54414,
    //     "longitude": 103.77232,
    //     "path": [
    //       [
    //         103.77232,
    //         29.54414
    //       ],
    //       [
    //         103.7510354,
    //         29.52016773
    //       ],
    //       [
    //         103.7680344,
    //         29.52016733
    //       ]
    //     ],
    //     "markers": [
    //       {
    //         "position": [
    //           103.77232,
    //           29.54414
    //         ],
    //         "label": {
    //           "content": "1.乐山大佛",
    //           "offset": [
    //             0,
    //             0
    //           ]
    //         }
    //       },
    //       {
    //         "position": [
    //           103.7510354,
    //           29.52016773
    //         ],
    //         "label": {
    //           "content": "2.赛里木湖",
    //           "offset": [
    //             0,
    //             0
    //           ]
    //         }
    //       },
    //       {
    //         "position": [
    //           103.7680344,
    //           29.52016773
    //         ],
    //         "label": {
    //           "content": "3.喀纳斯",
    //           "offset": [
    //             0,
    //             0
    //           ]
    //         }
    //       }
    //     ]
    //   }
    // }
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
    await axios.get('http://localhost:8080/mock/userInfo')
      .then((res) => {
        user = res.data
      })
    await axios.get('http://localhost:8080/mock/botInfo')
      .then((res) => {
        bot = res.data
      })
    commit('getData', {
      user, bot
    })
  },
  // 聊天机器人
  sendValue: async ({ commit }, { uid, message, user_flag }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    let robotData = ''
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, uid, message, user_flag })
    await axios.get('http://139.199.192.34:8080/v1/api/chatmessage/', {
      // await axios.get('http://182.254.227.188:45678/v1/api/chatmessage', {
      // await axios.get('/chatmessage', {
      params: {
        uid,
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