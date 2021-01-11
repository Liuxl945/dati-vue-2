import Vue from 'vue'
import Vuex from 'vuex'

import { question1, question2 } from "./config"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        question1: question1,

        question2: question2,

        questionIndex: 0,

        indexState: 1, //哪个场景
    },
    mutations: {
        ["SET_INDEX"](state, index) {
            state.indexState = index
        },
        ["SET_QUESTION_INDEX"](state, index) {
            state.questionIndex = index
        },
    },
    actions: {},
    modules: {}
})