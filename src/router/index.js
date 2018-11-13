import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Game from '@/components/Game'
import firebase from 'firebase'

// https://medium.com/codingthesmartway-com-blog/vue-js-routing-with-vue-router-4c428fabb078

Vue.use(Router)



let router = new Router({
	mode: "history", // default without this is /#/urls
	routes: [
		{
			path: '*',
			redirect: '/login'
		},
		{
			path: '/',
			redirect: '/hello'
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp
		},
		{
			path: '/game',
			name: 'Game',
			component: Game,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/hello',
			name: 'Hello',
			component: Hello
		}
	]
})

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	console.log( 'requiresAuth:' + requiresAuth );
	//console.log( 'currentUser:' + currentUser );

	if (requiresAuth && !currentUser) next('login')
	else next()
})

export default router
