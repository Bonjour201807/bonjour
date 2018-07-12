import axios from 'axios';
import { SAVE_LOCATION } from '../mutation-types';

const state = {
  ip: "",
  local: ""
}

const actions = {
  getLocation({ commit }, data) {
    commit(SAVE_LOCATION)
  }
}

const mutations = {
  [SAVE_LOCATION](state, data) {
    state.ip = returnCitySN["cip"];
    state.local = returnCitySN["cname"];
  }
}

export default {
  state,
  actions,
  mutations
}