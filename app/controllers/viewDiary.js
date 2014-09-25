
	var authorCollection = Alloy.createCollection('db_diary');
	var table1 = authorCollection.config.adapter.collection_name;
	
	var contentCollection = Alloy.createCollection('viewDiary');
	var table = contentCollection.config.adapter.collection_name;
	contentCollection = Alloy.Collections.instance('viewDiary');
function init(){
	getAuthorList();
}

function getAuthorList(){
	
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
		row.addEventListener('click', getDate);
		authorArr.push(row);	
	}
	tblView1.setData(authorArr);
	$.viewDiary.add(tblView1);	
	return false;
	
}

function getDate(row_evt){

	
	var tblView = Ti.UI.createTableView();
	var id = row_evt.source.c_id; 
	
	var sql = 'SELECT * FROM ' +table+ ' WHERE content_id=' +id;
	contentCollection.fetch({ query: sql});
	if(contentCollection.length != 0){
		var dateArr = [];
		for(var y=0; y<contentCollection.length; y++){
			var data = contentCollection.at(y);
			
			var id = data.get('content_id');
			var date = data.get('date');
			var content = data.get('content');
			var list = Ti.UI.createTableViewRow({
				'title' : date,
				'notes': content,
				'c_id' : id  
			});
			list.addEventListener('click', getNotes);
			dateArr.push(list);
		}
		tblView.setData(dateArr);
		$.viewDiary.add(tblView);
		
	} else { alert("NO RECORD");}
}

function getNotes(list_evt){
	var notes = list_evt.source.notes;
	//var dates = list_evt.source.title;
	var win = Ti.UI.createWindow({ backgroundImage: '/images/wood.jpg' });
	var textField = Ti.UI.createTextArea({
		width: '90%',
		height: '80%',
		left: '5%',
		right: '5%',
		top: '15%',
		backgroundColor: 'transparent',
		backgroundImage: '/images/write.jpeg',
  		returnKeyType: Ti.UI.RETURNKEY_GO,	
		value: notes,
		enabled: false,
		scrollable: true
		
	});
	var editBtn = Ti.UI.createButton({ top: 20, left: 5, width: 60, height: 60, backgroundImage: '/images/edit1.png'});
	editBtn.addEventListener('click', function(e){ textField.enabled=true; alert('You may now edit your diary!'); });
	var val = textField.value;
	textField.addEventListener('change', function(e){
		 val = textField.value;
	});
	
	var saveBtn = Ti.UI.createButton({ top: 20, left: 50, width: 60, height: 60, backgroundImage: '/images/save.png', });
	saveBtn.addEventListener('click', function() {saveChanges(val,list_evt.source.title,list_evt.source.c_id);});
	
	win.add(editBtn);
	win.add(saveBtn);
	
	win.add(textField);
	$.viewDiary.close();
	win.open();
	
}

function saveChanges(value,date,id){
	//var sql = 'SELECT * FROM ' +table+ ' WHERE '
	
}
init();