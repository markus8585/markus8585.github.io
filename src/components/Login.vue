<template>
	<form class="material login" action="#">
		<h1>Login</h1>
		<div class="container">
			<input v-model="email" class="login-email mdl-textfield__input" type="email" placeholder="email" required="required" />
			<input v-model="password" class="login-password mdl-textfield__input" type="password" placeholder="password" required="required" />
			<button class="cancelRegister mdl-textfield__input ghost text hidden" type="button">cancel</button>
			<button class="doRegister mdl-textfield__input ghost hidden" type="button">Register</button>
			<button v-on:click="login" class="doLogin btn" type="submit">Login</button>
			<!-- <button class="btn doResetPassword" type="button">Reset Password</button> -->
		</div>
		<router-link to="/sign-up" class="showRegister ghost">Don't have an account? <strong>Register Now</strong></router-link>
	</form>
</template>
<style>
 .showRegister {
	 text-decoration: none;
	 }
	 strong { text-decoration: underline; }
</style>
<script>
	import firebase from 'firebase'

	export default {
		name: 'login',
		data: function() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						this.$router.replace('game');
					},
					(err) => {
						console.log('oops'+ err.message); //TODO
					}
				);
			}
		}
	}
</script>

<style>
</style>
