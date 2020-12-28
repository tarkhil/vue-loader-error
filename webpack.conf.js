const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
	/* bill_info: './src/BillInfo.vue', */
	// ajax_info: './src/ajax_info.js',
	// ajax_bill: './src/ajax_bill.js',
	// ajax_tariffs: './src/ajax_tariffs.js',
	// receipts: './src/receipts.js',
	// monthly_unsent: './src/unsent.js',
	// monthly_dashboard: './src/monthly_dashboard.js',
	//      client_display: './src/client-display.js', // to add later
    },
    output: {
	filename: '[name].js',
	path: resolve('public/assets/js'),
	publicPath: '/',
    },
    resolve: {
	alias: {
	    src: resolve(__dirname, "src"),
	    //'vue$': 'vue/dist/vue.esm.js'
	}
    },
}
