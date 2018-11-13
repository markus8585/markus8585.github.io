// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

import moment from 'moment';
// Object.definePrototype(Vue.prototype, '$moment', { value: moment });

Vue.config.productionTip = false
let app;

// Initialize Firebase
// TODO MOVE ME
var config = {
	apiKey: "AIzaSyAXiLCGoFUG-UBPk2S3wyyyIfyxNDakjbo",
	authDomain: "gifchambeau-67f7b.firebaseapp.com",
	databaseURL: "https://gifchambeau-67f7b.firebaseio.com",
	projectId: "gifchambeau-67f7b",
	storageBucket: "",
	messagingSenderId: "439998404166"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged( function(user) {
	if(!app) {
		app = new Vue({
			el: '#app',
			router,
			template: '<App/>',
			components: { App }
		})
	}
})


// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
