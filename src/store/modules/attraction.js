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
        let filepaths = state.attractionItem.pics;
        let slides = [];
        filepaths.map(data =>
            slides.push(
                data.filepath
                // axios.defaults.baseURL.concat(data.filepath)
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
    getSingleEvent(state, data) {
        state.attractionItem = data
        console.log("test_attractionItem")
        console.log(data)
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
            axios.get('http://182.254.227.188:45678/v1/api/attractions')
                .then((res) => {
                    commit('loadMore', res.data)
                    resolve(res.data)
                })
        })
    },

    /**
     * Getting single event
     * sid: attraction sid
     */
    getSingleEvent({ commit, state }, { sid }) {
        return new Promise((resolve, reject) => {
            axios.get('http://182.254.227.188:45678/v1/api/attractions', {
                params: {
                    id: sid
                }
            })
                .then((res) => {
                    commit('getSingleEvent', res.data)
                    resolve(res.data)
                })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}