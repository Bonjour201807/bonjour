import Vue from 'vue'
import Vuex from 'vuex'

import listsStore from './modules/listsStore'
import attraction from './modules/attraction'
import weather from './modules/weather'
import searchInfo from './modules/searchInfo'
import selectPlace from './modules/selectPlace'
import selectTags from './modules/selectTags'
import chatbot from './modules/chatbot'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        listsStore,
        attraction,
        weather,
        searchInfo,
        selectPlace,
        selectTags,
        chatbot
    }
})