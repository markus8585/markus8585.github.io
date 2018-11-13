<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div class="the-game modal">
			Hello begins in <span class="countdown"></span>
		</div>
		<button v-on:click="logout">Logout</button>
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


export default {

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
