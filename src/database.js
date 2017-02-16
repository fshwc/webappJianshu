var smallDatabase;

function runQuery(query,data) {
	var remaining = data.length;

	if(!(data[0] instanceof Array)) {
		data = [data];
	}

	return new Promise(function(resolve, reject) {
		var i = 0;
		smallDatabase.transaction(function(tx) {
			for(i = 0;i < data.length; i++) {
				tx.executeSql(query,data[i],function(tx, results) {
					resolve(results.rows);
				})
			}
		})
	})
}

function open() {
	smallDatabase = openDatabase('webappblog','1.0','a webapp',(5*1024*1024));
	runQuery('CREATE TABLE IF NOT EXISTS articles(id,wrapImg,author,authorImg,time,title)',[]);
}

module.exports = {
    open: open,
    runQuery: runQuery
}