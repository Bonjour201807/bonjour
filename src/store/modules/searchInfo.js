import axios from "axios";
import {
  SAVE_HOT_TAGS,
  SAVE_HOT_PLACE,
  SAVE_HISTORY,
  SAVE_SEARCH_RESULT,
  EMPTY_SEARCH_RESULT,
  SAVE_SEARCH_DAY,
} from "../mutation-types";

const state = {
  hotPlace: [],
  hotTags: {},
  searchHistory: [],
  searchResult: {},
  SearchDay: ''
}

const actions = {
  getHotTags({ commit }, { scroll_id }) {
    axios.get('http://182.254.227.188:45678/v1/api/tags', {
      params: {
        scroll_id: scroll_id
      }
    }).then((res) => {
      commit(SAVE_HOT_TAGS, res.data);
    })
  },
  getHotPlace({ commit }, payload) {
    axios.get('http://182.254.227.188:45678/v1/api/hotplace').then((res) => {
      commit(SAVE_HOT_PLACE, res.data);
    })
  },
  getHistory({ commit }, payload) {
    axios.get('http://182.254.227.188:45678/v1/api/history').then((res) => {
      commit(SAVE_HISTORY, res.data);
    })
  },
  getSearchResult({ state, commit, rootState }, payload) {
    let query = ['key=' + payload, 'day=' + state.SearchDay, 'place=' + rootState.userInfo.local].join('&')
    axios.get('http://182.254.227.188:45678/v1/api/search?' + query).then(res => {
      commit(SAVE_SEARCH_RESULT, res.data)
    })
  },
  emptySearchResult({ commit }, payload) {
    commit(EMPTY_SEARCH_RESULT)
  },
  setSearchDay({ commit }, payload) {
    commit(SAVE_SEARCH_DAY, payload);
  }
}

const mutations = {
  [SAVE_HOT_TAGS](state, data) {
    state.hotTags = data;
  },
  [SAVE_HOT_PLACE](state, data) {
    state.hotPlace = data;
  },
  [SAVE_HISTORY](state, data) {
    state.searchHistory = data;
  },
  [SAVE_SEARCH_RESULT](state, data) {
    state.searchResult = data;
  },
  [EMPTY_SEARCH_RESULT](state, data) {
    state.searchResult = {};
  },
  [SAVE_SEARCH_DAY](state, data) {
    state.SearchDay = data;
  }
}

export default {
  state,
  actions,
  mutations
}