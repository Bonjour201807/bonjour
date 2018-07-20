import axios from 'axios';

const state = {
  // 初始化基础数据
  data: { user: {}, bot: {} },
  // id="0"表示机器人
  messageList: [
    {
      self: false, id: 0, message: { "text": "不知道去哪儿浪，交给我～" }, time: '4:28', flag: 1
    },
    {
      self: false, "id": 0, "flag": 2,
      "message": {
        "text": "您可能感兴趣的标签：",
        "tags": ["云海", "湖泊", "雪山", "日出", "冰川", "峡谷"]
      }
    },
    {
      self: false, "id": 0, "flag": 4,
      "message": {
        "name": "\u4e50\u5c71\u5927\u4f5b",
        "intro": "\u4e50\u5c71\u5927\u4f5b\uff0c\u53c8\u540d\u51cc\u4e91\u5927\u4f5b\uff0c\u4f4d\u4e8e\u56db\u5ddd\u7701\u4e50\u5c71\u5e02\u5357\u5cb7\u6c5f\u4e1c\u5cb8\u51cc\u4e91\u5bfa\u4fa7\uff0c\u6fd2\u5927\u6e21\u6cb3\u3001\u9752\u8863\u6c5f\u548c\u5cb7\u6c5f\u4e09\u6c5f\u6c47\u6d41\u5904\u3002\u5927\u4f5b\u4e3a\u5f25\u52d2\u4f5b\u5750\u50cf\uff0c\u901a\u9ad871\u7c73\uff0c\u662f\u4e2d\u56fd\u6700\u5927\u7684\u4e00\u5c0a\u6469\u5d16\u77f3\u523b\u9020\u50cf\u3002\u4e50\u5c71\u5927\u4f5b\u5f00\u51ff\u4e8e\u5510\u4ee3\u5f00\u5143\u5143\u5e74\uff08713\u5e74\uff09\uff0c\u5b8c\u6210\u4e8e\u8d1e\u5143\u5341\u4e5d\u5e74\uff08803\u5e74\uff09\uff0c\u5386\u65f6\u7ea6\u4e5d\u5341\u5e74\u3002\u4e50\u5c71\u5927\u4f5b\u548c\u51cc\u4e91\u5c71\u3001\u4e4c\u5c24\u5c71\u3001\u5de8\u5f62\u5367\u4f5b\u7b49\u666f\u70b9\u7ec4\u6210\u7684\u4e50\u5c71\u5927\u4f5b\u666f\u533a\u5c5e\u4e8e\u56fd\u5bb65A\u7ea7\u65c5\u6e38\u666f\u533a\u3002 \u4e50\u5c71\u5927\u4f5b\u662f\u4e00\u5c0a\u5f25\u52d2\u4f5b\uff0c\u5510\u4ee3\u5d07\u62dc\u5f25\u52d2\u4f5b\uff0c\u4f5b\u7ecf\u8bf4\u5f25\u52d2\u51fa\u4e16\u5c31\u4f1a\u201c\u5929\u4e0b\u592a\u5e73\u201d\uff0c\u6b66\u5468\u65f6\u671f\uff0c\u6b66\u5219\u5929\u66fe\u4e0b\u4ee4\u7f16\u9020\u4e86\u4e00\u90e8\u300a\u5927\u4e91\u7ecf\u4e66\u300b\uff0c\u8bc1\u660e\u5979\u662f\u5f25\u52d2\u8f6c\u4e16\uff0c\u767e\u59d3\u5bf9\u5f25\u52d2\u7684\u5d07\u62dc\u5e2e\u52a9\u5979\u5728\u7537\u5c0a\u5973\u5351\u7684\u5c01\u5efa\u65f6\u4ee3\u767b\u4e0a\u5e1d\u4f4d\u3002\u7531\u4e8e\u6b66\u5219\u5929\u7684\u5927\u529b\u63d0\u5021\uff0c\u4f7f\u5168\u56fd\u5851\u51ff\u5f25\u52d2\u4e4b\u98ce\u5927\u884c\u3002\u4e50\u5c71\u5927\u4f5b\u7684\u4fee\u9020\u8ddd\u6b66\u5219\u5929\u65f6\u4ee3\u4ec520\u4f59\u5e74\uff0c\u6240\u4ee5\u5f53\u6d77\u901a\u4fee\u9020\u4e50\u5c71\u5927\u4f5b\u65f6\uff0c\u81ea\u7136\u9009\u62e9\u4e86\u5f25\u52d2\u4f5b\uff0c\u800c\u4e14\u5f25\u52d2\u4f5b\u65e2\u662f\u80fd\u5e26\u6765\u5149\u660e\u548c\u5e78\u798f\u7684\u672a\u6765\u4f5b\uff0c\u8fd9\u540c\u5e73\u606f\u6c34\u60a3\u7684\u9547\u6c5f\u4e4b\u4f5b\u8981\u6c42\u662f\u4e00\u81f4\u7684\u3002",
        "tags": [
          "\u4e00\u5ea7\u5c71",
          "\u4e09\u6c5f\u6c47\u6d41",
          "\u4e00\u5c0a\u6469\u5d16"
        ],
        "plays": [
          "\u770b\u5927\u4f5b",
          "\u5750\u8239"
        ],
        "latitude": 29.55016763,
        "longitude": 103.7780374,
        "id": "0",
        "pic": [
          {
            "tag": "瀑布",
            "name": "瀑布",
            "filepath": "/static/pic/bon-1.png"
          },
          {
            "tag": "翠海",
            "name": "翠海",
            "filepath": "/static/pic/bon-2.png"
          }]
      }
    },
    {
      self: false,
      "id": 0,
      "flag": 5,
      "message": {
        "weather_url": "http://i.tianqi.com/index.php?c=code&id=82&py=tianjin"
      }
    },
    {
      self: false, "id": 0, "flag": 6,
      "message": {
        "latitude": 29.54414,
        "longitude": 103.77232,
        "path": [
          [
            103.77232,
            29.54414
          ],
          [
            103.7510354,
            29.52016773
          ],
          [
            103.7680344,
            29.52016733
          ]
        ],
        "markers": [
          {
            "position": [
              103.77232,
              29.54414
            ],
            "label": {
              "content": "1.乐山大佛",
              "offset": [
                0,
                0
              ]
            }
          },
          {
            "position": [
              103.7510354,
              29.52016773
            ],
            "label": {
              "content": "2.赛里木湖",
              "offset": [
                0,
                0
              ]
            }
          },
          {
            "position": [
              103.7680344,
              29.52016773
            ],
            "label": {
              "content": "3.喀纳斯",
              "offset": [
                0,
                0
              ]
            }
          }
        ]
      }
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
  sendValue: async ({ commit }, { id, message, user_flag }) => {
    // 声明一个变量用来储存等下ajax获取的数据
    let robotData = ''
    // 处理输入的内容，设置self为true，作为一个标记。
    commit('changeList', { self: true, id, message, user_flag })
    await axios.get('/mock/chatmessage', {
      params: {
        id,
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