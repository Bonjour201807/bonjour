import { SAVE_SELECTED_TAGS } from '../mutation-types';

const state = {
  input_tag: "",
  select_tags: [],
  size: 9
}

const mutations = {
  [SAVE_SELECTED_TAGS](state, data) {
    state.input_tag = data.input_tag;
    state.select_tags = data.select_tags;
  }
}

const actions = {
  getSelectedTags({ commit }, data) {
    commit(SAVE_SELECTED_TAGS, data)
  }
}

export default {
  state,
  actions,
  mutations
}