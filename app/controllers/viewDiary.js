
//exports.baseController = "index";

//var table2 = authorCollection.config.adapter.collection_name('diary_notes');

function init(){
	getAuthorList();
}

function getAuthorList(){
	var authorCollection = Alloy.createCollection('db_diary');
	var table1 = authorCollection.config.adapter.collection_name;
	authorCollection = Alloy.Collections.instance('db_diary');
	var tblView1 = Ti.UI.createTableView();
	var sql = 'SELECT * FROM ' +table1;	
	authorCollection.fetch({ query: sql});
	
	var authorArr = [];
	for(var x=0; x<authorCollection.length; x++){
		
		var info = authorCollection.at(x);
		
		var name = info.get('name');
		var id = info.get('author_id');
		var row = Ti.UI.createTableViewRow({
			'title' : name,
			'c_id' : id
		}); 
		row.addEventListener('click', getContent);
		authorArr.push(row);	
	}
	tblView1.setData(authorArr);
	$.viewDiary.add(tblView1);	
	return false;
	
}

function getContent(row_evt){
	
	var contentCollection = Alloy.createCollection('viewDiary');
	var table = contentCollection.config.adapter.collection_name;
	contentCollection = Alloy.Collections.instance('viewDiary');
	//var view = Ti.UI.createView();
	//view.accessibilityHidden=true;
	var tblView = Ti.UI.createTableView();
	
	var sql = 'SELECT * FROM ' +table+ ' WHERE content_id=1';
	contentCollection.fetch({ query: sql});
	
	var contentArr = [];
	for(var y=0; y<contentCollection.length; y++){
		var content = contentCollection.at(y);
		
		var id = content.get('content_id');
		var date = content.get('date');
		var list = Ti.UI.createTableViewRow({
			'title' : date,
			'c_id' : id  
		});
		contentArr.push(list);
	}
	//var section = Ti.UI.createTableViewRow();
	
	tblView.setData(contentArr);
	tblView.appendRow(list);
	$.viewDiary.add(tblView);
	//tblView.show();
	
}

init();