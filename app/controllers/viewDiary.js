
//exports.baseController = "index";

//var table2 = authorCollection.config.adapter.collection_name('diary_notes');



function init(){
	var authorCollection = Alloy.createCollection('db_diary');
	var table1 = authorCollection.config.adapter.collection_name;
	authorCollection = Alloy.Collections.instance('db_diary');
	
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
	$.authorTbl.setData(authorArr);	
	return false;
	
}

function getContent(row_evt){
	var contentCollection = Alloy.createCollection('viewDiary');
	var table = contentCollection.config.adapter.collection_name;
	contentCollection = Alloy.Collections.instance('viewDiary');
	var view = Ti.UI.createView();
	view.accessibilityHidden=true;
	var listView = Ti.UI.createListView();
	
	var sql = 'SELECT * FROM ' +table+ ' WHERE content_id=1';
	contentCollection.fetch({ query: sql});
	
	var contentArr = [];
	for(var y=0; y<contentCollection.length; y++){
		var content = contentCollection.at(y);
		
		var id = content.get('content_id');
		var date = content.get('date');
		var list = Ti.UI.createListSection({
			'title' : date,
			'c_id' : id  
		});
		contentArr.push(list);
	}
	var section = Ti.UI.createListSection();
	section.setItems(contentArr);
	listView.sections = [section];
	view.add(listView);
	view.accessibilityHidden=False;
	
}

init();