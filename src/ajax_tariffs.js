import Vue from 'vue';
import store from './store';
import CloseTariff from './components/CloseTariff.vue'

var app = new Vue({
    store,
    components: {
	CloseTariff
    },
    beforeCreate() {
	console.log('before create');
    },
    mounted() {
	console.log('mounted');
    }
}).$mount("#app");
