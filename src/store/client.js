import axios from 'axios'

const state = () => ({
    client_id: null,
    client_data: null,
    agreements: null,
    bills: null,
    loaded_ok: null,
    last_error: null
})

const getters = {
    clientId: (store) => store.client_id,
    clientData: (store) => store.client_data,
    clientAgreements: (store) => store.agreements,
    client: (store) => (key) => { return store.client_data===null?'':store.client_data[key] },
    loadedOk: (store) => store.loaded_ok,
    lastError: (store) => store.last_error,
}

const mutations = {
    setId(state, id) {
	state.client_id = id;
    },
    setData(state, data) {
	state.client_data = data;
	state.loaded_ok = true;
	state.last_error = null;
    },
    setAgreements(state, data) {
	state.agreements = data
    },
    setBills(state, data) {
	state.agreements = data
    },
    updateClient(state, payload) {
	state.client_data[payload.key] = payload.value;
    },
    failure(state, err) {
	state.loaded_ok = false;
	state.last_error = err;
    },
    loaded(state) {
	state.loaded_ok = true;
	state.last_error = null;
    },
    preparing(state) {
	state.loaded_ok = null;
	state.last_error = null;
    }
}

const actions = {
    async loadData(state) {
	const client_id = state.getters.clientId
	if ( client_id === undefined ) {
	    state.commit('failure','Идентификатор клиента не указан')
	} else {
	    await axios.get('/api/v1/client/'+client_id).
		then( res => state.commit('setData', res.data) ).
		catch( err => state.commit('failure', err) );
	}
    },
    async updateClient(state, payload) {
	payload['id'] = state.getters.clientId
	state.commit('preparing')
        await axios.post('/api/v1/client',
			 payload
			).then((req) => {
			    if ( req.data.client !== undefined ) {
				state.commit('setData', res.data)
			    }
			    if ( req.data.Error !== undefined ) {
				state.commit('failure', req.data.Error )
			    }
			} ).catch( (err) => state.commit('failure', err) );
    },
    setId(state, id) {
	if ( state.clientId !== id ) {
	    state.commit('setId',id);
	    // сбросим все
	    state.commit('setData', null);
	    state.commit('setAgreements', null);
	    state.commit('setBills',null);
	    state.dispatch('loadData');
	}
    },
}

export default {
//    namespaced: true, // later
    state,
    getters,
    actions,
    mutations
}


