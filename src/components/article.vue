<template>
<div class="box">
	<h1 class="title">{{art.title}}</h1>
	<div class="article-info">
		<img :src="art.authorImg" class="avatar"/>
		<div class="name">{{art.name}}</div>
		<div class="meta">{{art.titme}}</div>
	</div>
	<div class="content" v-html="art.content"></div>
</div>
</template>

<script>
export default {
	data() {
		return {
			art: {}
		}
	},
	computed: {
		formatTime() {
			const t = new Date(this.art.time);
			return (t.getMonth()+1)+"."+t.getDate()+" "+t.getHours()+":"+t.getMinutes();
		}
	},
	created() {
		const tId = this.$route.params.id;
		this.$http.get('/getArticleId',{params:{id: tId}}).then(response=> {
			this.art = response.body.article;
		},response => {
    		console.log(response);
 		})
	}
}
</script>

<style>
.box {
	padding:10px;
}
.box .title {
	margin: 15px 0;
    font-size: 30px;
    font-weight: 700;
    color: #2f2f2f;
    word-break: break-word;
    line-height: 1.4;
}
.article-info {
	margin-bottom:20px;
	font-size:13px;
	color:#b1b1b1;
}
.box .avatar {
	vertical-align: center;
	display:inline-block;
	line-height:1;
	width:34px;
	height:34px;
	border-radius:100px;
	border:1px solid #ddd;
}
.box .name {
	margin:0 5px;
	font-size:16px;
	font-weight:700;
	color:#484848;
	vertical-align:middle;
}
.box .meta {
	margin-top:10px;
}
.box .content {
	color:#2f2f2f;
	font-size:16px;
	font-weight:400;
	line-height:1.7;
	word-break:break-word;
}
.box .content p {
	margin-bottom:25px;
}
.image-package {
	margin:0 -18px 25px;
	text-align:center;
}
.image-package img {
	max-width:100%;
	height:auto;
	vertical-align: middle;
	border:0;
	cursor:-webkit-zoom-in;
	transition:all 0.25s ease-in-out;
}
</style>