<template>
  <div id="app">
	  <div v-html="msg"></div>
	<div id="chat">
		<h4>Send:</h4>
		<input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)">


		<h4>Messages:</h4><hr/>
			<ul id="messages" v-chat-scroll>
				<li v-for="msg in messages">{{msg.message}}</li>
			</ul>
	</div>
  </div>
</template>

<script>
import firebase from 'firebase';

// ES6
// Chat scroll to bottom library
import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);
var GphApiClient = require('giphy-js-sdk-core');
var client = GphApiClient("NML7PWscMTrhIl7D0ETCnYMCiAvLFX65");


export default {
	name: 'chat',
	data() {
		return {
			room: null,
			messagesPerPage: 500, // default precision
			precision: 6, // default precision
			db: null, // assign Firebase SDK later
			messageInput:'', // this is for v-model
			messages: [],
			msg: 'Welcome 2 Your Vue.js App'
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.room = firebase.database().ref().child('rooms/gifchambeau')
			// must call messageListener() to listen to the new message event
			this.messageListener()

			let data = {
				1521312515: 'started',
				1521312615: 'un-started',
				1521313615: 'un-started'
			};
			this.room.child('schedule').set(data);

			// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=***&limit=5");
			// xhr.done(function(data) {
			// 	console.log("success got data", data);
			// });

			client.search('gifs', {"q": "cats"}).then((response) => {
				response.data.forEach((gifObject) => {
					console.log( gifObject );
					this.msg += '<br/><img src="'+ gifObject.images.downsized_medium.gif_url +'" />';
					// this.msg += '<br/><img src="'+ gifObject.images.fixed_width_downsampled.gif_url +'" />';

				});
			}).catch((err) => {

			});
		},
		messageListener () {
			this.room.child('messages').limitToLast(this.messagesPerPage).on('child_added', (snapshot) => {
				// push the snapshot value into a data attribute
				this.messages.push( snapshot.val() )
				// animate chat box to bottom
			})
		},
		send(messageInput) {
			// A data entry.
			let data = {
				message: messageInput
			};

			// Get a key for a new message.
			let key = this.room.push().key;
			this.room.child('messages/' + key).set(data);
			console.log(messageInput);

			// clean the message
			this.messageInput = '';
		}
	}
}
</script>

<style>
#messages {
	height: 14em;
	overflow: scroll;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
	padding: 0;
	margin: 0;
}
li {
	padding: 0;
	margin: 0;
	list-style: none;

}
</style>
