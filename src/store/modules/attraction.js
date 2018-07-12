import axios from 'axios';

const state = {
    attractions: [],
    temp: [],
    skip: 0,
    attractionItem: {}
}

// Get the list of pictures for a single attraction
const getters = {
    slides() {
        let filepaths = state.attractionItem.pic;
        let slides = [];
        filepaths.map(data =>
            slides.push(
                data.filepath
            ),
        );
        return slides;
    }
}

const mutations = {
    loadMore(state, payload) {
        state.skip += 3
        state.attractions = state.attractions.concat(payload)
    },
    getSingleEvent(state, payload) {
        state.attractionItem = payload
    }
}

const actions = {
    /**
     * Loading more data
     * skip: 3 default
     * count: 3 default
     */
    loadMore({ commit, state }) {
        return new Promise((resolve, reject) => {
            axios.get('/mock/bonjour')
                .then((res) => {
                    commit('loadMore', res.data.data)
                    resolve(res.data.data)
                })
            // .get("http://182.254.227.188:45678/v1/api/attractions/list/")
            // .get('https://api.douban.com/v2/event/list?loc=108288&start=' +
            //     state.skip + '&count=3')
            // .then((err, res) => {
            //     console.log(res)
            //     // console.log(res.data.data)
            //     if (!err) {
            //         commit('loadMore', res.data.data)
            //         resolve(res)
            //     }
            // })
        })
    },

    /**
     * Getting single event
     * id: event id
     */
    getSingleEvent({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios.get(''.concat('/mock/bonjour', payload.id))
                .then((res) => {
                    commit('getSingleEvent', res.data)
                    resolve(res.data)
                })
            // .get("http://182.254.227.188:45678/v1/api/attractions/"  + payload.id)
            // .get('https://api.douban.com/v2/event/' + payload.id)
            // .then((err, res) => {
            //     if (!err) {
            //         commit({
            //             type: 'getSingleEvent',
            //             res: res.body
            //         })
            //         resolve(res)
            //     }
            // })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}