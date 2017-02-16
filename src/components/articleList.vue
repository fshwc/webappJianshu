<template>
<div>
	<div v-for="art in articles" @click="goto(art.id)" class="article">
		<a @click="goto(art.id)" class="wrap-img">
			<img :src="art.wrapImg" />
		</a>
		<div class="content">
			<div class="author">
				<a @click="goto(art.id)" class="avatar"><img :src="art.authorImg" /></a>
				<div class="name">
					{{art.author}}
					<span class="time">{{formatTime(art.time)}}</span>
				</div>
			</div>
			<a @click="goto(art.id)" class="title">{{art.title}}</a>
		</div>
	</div>
</div>
</template>

<script>
import {open,runQuery} from '../database'

export default {
	data() {
		return {
			articles:[]
		}
	},
	methods: {
		goto: function(id) {
			var url = id.substring(1);
			console.log(url);
			console.log('/article/'+url);
			this.$router.push('/article/'+url);
		},
		formatTime(t) {
			var now = new Date(),
				share = new Date(t),
				interval = (now.getTime() - share.getTime())/ 86400000;
			if(interval <= 1) {
				return parseFloat(interval).toFixed(1)*10 + "小时前";
			}else {
				var minutes = share.getMinutes()+"";
				minutes = minutes.length == 2 ? minutes : "0"+minutes;
				return (share.getMonth()+1) + "." + share.getDate() + " " + share.getHours() + ":" + minutes;
			} 
		}
	},
	created() {
		if(navigator && navigator.onLine === false) {
			//离线情况下读取数据库中的内容
			runQuery('SELECT * FROM articles',[]).then(function(results) {
				this.articles = results;
			}).catch(function() {})
		}else{
			//在线情况下拉最新的文章
			this.$http.get('/articleList').then(response=> {
				var data = response.body.article,
					articles= [];
				this.articles = data;

		 		//插入或替换数据
		 		for(var i = 0;i<data.length;i++) {
		 			articles[i] = [data[i].id,data[i].wrapImg,data[i].author,data[i].authorImg,data[i].time,data[i].title];
		 		}
		 		open();
		 		runQuery('DELETE FROM articles',[]).then(function(){
		 			runQuery('INSERT INTO articles(id,wrapImg,author,authorImg,time,title) VALUES (?,?,?,?,?,?)',articles).then(function() {})
		 		})				
			},response => {
	    		console.error(response);
	 		})
	 	}
	}
}
</script>

<style>
a {
	text-decoration:none;
}
.article {
	position:relative;
	padding:20px;
	border-bottom:1px solid #f0f0f0;
	word-wrap:break-word;
}
.article .wrap-img {
	position:absolute;
	top:50%;
	margin-top:-40px;
	right:20px;
	width:80px;
	height:80px;
}
.article .wrap-img img {
	width:100%;
	height:100%;
	border-radius:4px;
	border:1px solid #f0f0f0;
}
.article .content {
	padding-right:95px;
}
.article .author {
	margin-bottom:3px;
	font-size:13px;
}
.article .avatar {
	position:absolute;
	margin:4px 2px 0 0;
	color:#333;
}
.article .avatar img {
	width:20px;
	height:20px;
	border:1px solid #f0f0f0;
}
.article .name {
	display:inline-block;
	padding:6px 0 8px 28px;
	line-height:1.5;
}
.article .name a {
	color:#333;
}
.article .time {
	color:#969696;
	padding-left:2px;
}
.article .title {
	display:inherit;
	margin:-5px 0 5px;
	font-size:16px;
	line-height:1.5;
	color:#333;
}
</style>