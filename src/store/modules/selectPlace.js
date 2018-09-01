import axios from 'axios';
import { SAVE_LOCATION, SAVE_POSITION, SAVE_AREA_LIST } from '../mutation-types';

const state = {
  arealist: {},
  local: {},
  selectedPlace: {},
  size: 3
}

const mutations = {
  [SAVE_LOCATION](state, data) {
    state.local.adcode = returnCitySN["cid"];
    state.local.departure = returnCitySN["cname"];
  },
  [SAVE_POSITION](state, data) {
    state.local.lng = data["lng"];
    state.local.lat = data["lat"];
  },
  [SAVE_AREA_LIST](state, data) {
    state.arealist = data;
  },
  selectedPlace(state, data) {
    state.selectedPlace.departure = data.departure
    state.selectedPlace.adcode = data.adcode
    state.selectedPlace.days = data.days
  }
}
const actions = {
  getLocation({ commit }, data) {
    commit(SAVE_LOCATION, data)
  },
  getPosition({ commit }, data) {
    commit(SAVE_POSITION, data)
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