<template>
	<form class="material" action="#">
		<h1>Create an account</h1>
		<div class="container">
			<input v-model="email" class="register-email mdl-textfield__input" type="email" placeholder="email" required="required" />
			<input class="register-firstname mdl-textfield__input" type="firstname" placeholder="First Name" required="required" />
			<input class="register-lastname mdl-textfield__input" type="lastname" placeholder="Last Name" required="required" />
			<input v-model="password" class="register-password mdl-textfield__input" type="password" placeholder="password" required="required" />
			<!--<button class="cancelRegister mdl-textfield__input ghost text hidden" type="button">cancel</button>-->
			<button v-on:click="register" class="doRegister mdl-textfield__input" type="button">Register Now</button>
		</div>
		<router-link to="/login" class="showLogin ghost">Already an account? <strong>Login</strong></router-link>
	</form>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'register',
		data: function() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			register: function() {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
					function(user) {
						console.log('Account has been created!');
					},
					function(err) {
						console.log('An error has occured: ' + err.message);
					}
				)
			}
		}
	}
</script>

<style>
</style>
