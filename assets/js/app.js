window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.axios = require('axios');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueProgressBar from 'vue-progressbar';
const options = {
  color: '#337AB7',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
};
Vue.use(VueProgressBar, options);

const routes = [
	{ path: '/*', component: require('./pages/404.vue') }
];

window.router = new VueRouter({
	mode: 'history',
	routes: routes
});

const app = new Vue({
	router: router,

	data: {
		auth: {},
		csrf: ''
	},

	created: function() {
		//  hook the progress bar to start before we move router-view 
    	this.$router.beforeEach((to, from, next) => {
      	//  does the page we want to go to have a meta.progress object 
      	if (to.meta.progress !== undefined) {
        	let meta = to.meta.progress
        	// parse meta tags 
        	this.$Progress.parseMeta(meta)
      	}
      	//  start the progress bar 
      	this.$Progress.start()
      	//  continue to next page 
      	next()
    	})
    	//  hook the progress bar to finish after we've finished moving router-view 
    	this.$router.afterEach((to, from) => {
      		//  finish the progress bar 
      		this.$Progress.finish()
    	})
  	}
}).$mount('#app');