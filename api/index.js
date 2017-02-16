const express = require('express')
const path = require('path')
const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)
const crawler = require('./crawler');

const app = express();
app.use('/dist', express.static(resolve('../dist')))


//全部文章
app.get("/articleList",function(req, res) {
	crawler({type:1}).then(function(data) {
		res.json({article:data.noteList});
		res.end();
	}).catch(function(err) {
		console.log(err);
	})
})

//单篇文章
app.get('/getArticleId',function(req, res) {
	var aId = "p/"+req.query.id;
	crawler({type:0,id:aId}).then(function(data) {
		res.json({article:data.noteList});
		res.end();
	}).catch(function(err) {
		console.log(err);
	})
});

app.get('/',function(req, res) {
	res.sendFile('index.html',{root:__dirname+"/../"},function(err) {
		if(err) {
			console.log(err)
		}else {
			console.log('yes');
		}
	});
})

app.get('/getScript',function(req, res) {
	fs.readFile('../dist/build.js',function(err,data) {
		if(err) {
			return console.error(err)
		}
		res.send(data.toString());
		res.end();
	});

})

app.get('/webappblog.manifest',function(req, res) {
	res.sendFile('webappblog.manifest',{root:__dirname+"/../"},function(err) {
		if(err) {
			console.log(err)
		}else {
			console.log('manifest yes');
		}
	});
})

app.listen(3000,function() {
	console.log('example app listening at 3000');
})