var http = require('http')
var jianshuUrl = 'http://www.jianshu.com/'
var cheerio = require('cheerio')

function crawlerList(mes) {
	var url = jianshuUrl + (mes.type == 1 ? "" : mes.id); 
	return new Promise(function(resolve,reject) {
		http.get(url,function(res) {
			var html = '';
			res.on('data',function(data) {
				html += data;
			})
			res.on('end',function() {
				var noteList = (mes.type == 1 ? filterChapters(html) : filterArticle(html));
				resolve({noteList:noteList});
			})
		}).on('error',function(err) {
			reject(err)
		})
	})
}

function filterChapters(html) {
	var $ =  cheerio.load(html);
	var noteList = $('.note-list li');
	//[{wrapImg:'', authorImg:'',author:'',time'',title:'',abstract:'',tag:'',read:''}]
	
	var noteData = [];

	noteList.each(function(item) {
		var note = $(this);
		var data = {};
		data.wrapImg = note.find('.wrap-img img').attr('src');
		data.authorImg = note.find('.avatar img').attr('src');
		data.author = note.find('.name a').text();
		data.time = note.find('.time').attr('data-shared-at');
		data.title = note.find('.title').text();
		data.id = note.find('.title').attr('href');
		noteData.push(data);
	})

	return noteData;
}

function filterArticle(html) {
	var $ =  cheerio.load(html);
	var note = $('.article');
	var data = {};
	data.title = note.find('.title').text();
	data.time = note.find('.meta span').text();
	data.authorImg = note.find('.avatar img').attr('src');
	data.name = note.find('.name a').text();
	data.content = note.find('.show-content').html();
	return data;
}

module.exports = crawlerList