<template>
  <div id="app">
    LOGO
    <router-view/>
	<!--<div id="chat">
		<h4>Send:</h4>
		<input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)">

		<h4>Messages:</h4><hr/>
		<div v-for="msg in messages">{{msg.message}}</div>
	</div>-->
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
	name: 'chat',
	data() {
		return {
			room: null,
			messagesPerPage: 4, // default precision
			precision: 6, // default precision
			db: null, // assign Firebase SDK later
			messageInput:'', // this is for v-model
			messages: []
		}
	},
	mounted() {
		//this.init();
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
			this.room.child('schedule').set(data)
		},
		messageListener () {
			this.room.child('messages').limitToLast(this.messagesPerPage).on('child_added', (snapshot) => {
				// push the snapshot value into a data attribute
				this.messages.push(snapshot.val())
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
