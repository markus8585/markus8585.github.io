<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<!-- <div class="the-game modal">
			To login: <span class="countdown"></span>
		</div> -->
		<router-link to="/login">Login</router-link>
	</div>
</template>

<script>
/*

TABS

https://github.com/youngten/Vue-Firebase-Realtime-Chat/tree/master/src
https://firebase.google.com/docs/database/web/lists-of-data
https://codeburst.io/part-1-bootstrap-4-vs-foundation-6-4-the-grid-8c02747f14fb
http://www.timestampconvert.com/
https://medium.com/vuejobs/create-a-global-event-bus-in-vue-js-838a5d9ab03a
https://console.firebase.google.com/u/0/project/gifchambeau-67f7b/database/gifchambeau-67f7b/data/?pli=1
https://blog.sicara.com/a-progressive-web-application-with-vue-js-webpack-material-design-part-1-c243e2e6e402
https://vuejs.org/v2/cookbook/adding-instance-properties.html


*/



import firebase from 'firebase';
import moment from 'moment';

let eventTime= moment()+30; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
let currentTime = moment(); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
let diffTime = eventTime - currentTime;
let duration = moment.duration(diffTime*1000, 'milliseconds');
let interval = 1000;

// var seconds = new Date(year, month, day, hours, minutes, seconds, 0).getTime() / 1000;
var seconds = new Date(2018, 2, 24, 17, 39, 0, 0);

// console.log( '**********************' );
// console.log( seconds.toString() );
// console.log( new Date() );
// console.log( '**********************' );


console.log( '**********************' );
console.log( moment().toString() );
console.log( '**********************' );

var m = moment();
var roundDown = m.startOf('hour');
console.log( roundDown.toString() ); // outputs Tue Feb 17 2017 12:00:00 GMT+0000

var m = moment();
var roundUp = m.minute() || m.second() || m.millisecond() ? m.add(1, 'hour').startOf('hour') : m.startOf('hour');
console.log( roundUp.toString() );  // outputs Tue Feb 17 2017 13:00:00 GMT+0000


var m = moment().startOf('minute');
var remainder = 30 - (m.minute() % 30);
var dateTime = m.add(remainder, "minutes"); //.format("DD.MM.YYYY, h:mm:ss a");
console.log( dateTime.toString() );

export default {
	created() {
		duration = moment.duration(duration - interval, 'milliseconds');
		interval = 1000;

		window.setInterval(() => {
			this.msg = Math.trunc((new Date()).getTime() / 1000);
		},1000);

		if( duration <= 0 ){
			clearInterval(countDown);
		}

		this.init();

		// console.log('The time is ' . this.moment().format("HH:mm"));
	},
	name: 'HelloWorld',
	data () {
		return {
			msg: 'Welcome 2 Your Vue.js App'
		}
},
methods: {
	init(){
		console.log('INIT')
		//firebase.database().ref().child('rooms/gifchambeau')
		// console.log( this.room );
		// this.room.child('messages').limitToLast(this.messagesPerPage).on('child_added', (snapshot) => {
		// 	// push the snapshot value into a data attribute
		// 	console.log(snapshot.val())
		// })
		// console.log( this.schedule );
	},
	logout: function() {
		firebase.auth().signOut().then(() => {
			this.$router.replace('login')
		})
	}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
