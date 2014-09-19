
//exports.baseController = "index";
var authorCollection = Alloy.createCollection('db_diary');
var table1 = authorCollection.config.adapter.collection_name;
//var table2 = authorCollection.config.adapter.collection_name('diary_notes');

function getAuthors(){
	
	authorCollection = Alloy.Collections.instance('author_info');
	var sql = 'SELECT * FROM'+table1;
	authorCollection.fetch({ query: sql });
	
	var authorArr = [];
	for(var x=0; x<=authorCollection.lenght;x++){
		var name = author_info.get('name');
		var id = author_info.get('author_id');
		var row = Ti.UI.createTableViewRow({
			'title' : name,
			'c_id' : id
		});
	authorArr.push(row);
	}
	
	return authorArr;
}
//module.exports = viewDiary;