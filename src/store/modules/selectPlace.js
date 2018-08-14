import axios from 'axios';
import { SAVE_LOCATION, SAVE_AREA_LIST } from '../mutation-types';

const state = {
  arealist: {},
  ip: "",
  local: "",
  selectedPlace: "",
}

const mutations = {
  [SAVE_LOCATION](state, data) {
    state.ip = returnCitySN["cip"];
    state.local = returnCitySN["cname"];
  },
  [SAVE_AREA_LIST](state, data) {
    state.arealist = data;
  },
  selectedPlace(state, data) {
    state.selectedPlace = data
  }
}
const actions = {
  getLocation({ commit }, data) {
    commit(SAVE_LOCATION)
  },
  getAreaList({ commit }) {
    axios.get('http://182.254.227.188:45678/v1/api/areaInfo').then((res) => {
      commit(SAVE_AREA_LIST, res.data);
    })
  },
  getSelectedPlace({ commit }, data) {
    commit("selectedPlace", data)
  }
}

export default {
  state,
  actions,
  mutations
}