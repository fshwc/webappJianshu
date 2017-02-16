<template>
<div >

	<header class="header">
		<button class="btn-slide-bar" @click="showSlideBar">
			<span></span><span></span><span></span>
		</button>
		<h3><router-link to="/">简书</router-link></h3>
	</header>
	<router-view></router-view>
	<section class="slide-bar">
		<ul>
			<li><router-link to="/">首页</router-link></li>
			<li>个人中心</li>
			<li>APP下载</li>
		</ul>
	</section>

</div>
</template>

<script>
export default {
	data() {
		return {
			showBar: false
		}
	},
	methods: {
		showSlideBar() {
			var _body = document.querySelector("body");
			_body.classList.toggle("active");
		},
		hideAlideBar() {
			var _body = document.querySelector("body");
			_body.classList.remove("active");
		}
	},
	watch: {
		'$route': 'hideAlideBar'
	}
}
</script>

<style>
h3,ul,li,button,span,header,body,div,footer,section {
	margin: 0;
	padding: 0;
}
html {
	height:100%;
}
body {
	position: relative;
	height:100%;
}

li {
	list-style: none;
}

.header {
	width: 100%;
	height: 44px;
	line-height: 44px;
	color: #01553d;
	display: fixed;
	top: 0;
	border-bottom: 1px solid rgba(204,204,204,0.5);
}

.header h3 {
	text-align: center;
}

.header h3 a {
	color:#01553d;
	text-decoration:none;
	margin-left:-50px;
}

.footer {
	bottom: 0;
	position: fixed;
}

.btn-slide-bar {
	width: 35px;
	height: 35px;
	float: left;
	cursor: pointer;
	text-align: center;
	background: #fff;
	border: none;
	margin: 5px;
}

.btn-slide-bar span {
	width: 70%;
	background: #888;
	height: 3px;
	display: block;
	margin: 5px auto;
}

.slide-bar {
	width: 150px;
	position: fixed;
	top: -1px;
	bottom: 0px;
	background-color: #333;
	left: 0;
	transform:translateX(-150px);
	-webkit-transform:translateX(-150px);
}

.slide-bar li {
	padding-left: 10px;
	height: 40px;
	line-height: 40px;
	text-align: left;
	color: #fff;
	border-bottom: 1px solid #222;
}
.slide-bar li a {
	color:#fff;
	text-decoration:none;
}
.active {
	transform: translate3d(150px,0,0);
	-webkit-transform: translate3d(150px,0,0);
	transition:all 0.2s ease-in-out;
	-webkit-transition:all 0.2s ease-in-out;
}

</style>