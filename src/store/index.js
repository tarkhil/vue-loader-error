import Vue from 'vue'
import Vuex from 'vuex'
import client from './client.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
	client,
    }
})
