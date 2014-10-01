
	var authorCollection = Alloy.createCollection('db_diary');
	var table1 = authorCollection.config.adapter.collection_name;
	
	var contentCollection = Alloy.createCollection('viewDiary');
	var table = contentCollection.config.adapter.collection_name;
	
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
			'id': id,
			Width: '80%'
		}); 
		
		var nameBtn =Titanium.UI.createButton({ 'id': id, title: name, left:0  });
		
		var delUser =Titanium.UI.createButton({ 'id': id, backgroundImage:'/images/delete_user.png', right:0,  });
		
		row.add(delUser);
		row.add(nameBtn);
		
		delUser.addEventListener('click', deleteDialog);
		nameBtn.addEventListener('click', getDate);
		authorArr.push(row);
	
	}
	
	tblView1.setData(authorArr);
	$.viewDiary.add(tblView1);	
	return false;
	
}

function deleteDialog(delUser_evt){
	
	var alertDialog = Ti.UI.createAlertDialog({ 
					title: 'Delete ',
					message: 'Are you sure?',
					buttonNames: ['Delete Anyway','Cancel'],
					cancel:1
					});
	alertDialog.addEventListener('click', function(alertDialog_evt){
		if(alertDialog_evt.index === 0){
			removeUser(delUser_evt.source.id);
			getAuthorList();
		}
	});
	alertDialog.show();
	
	return false;
}

function removeUser(id){
	authorCollection = Alloy.Collections.instance('db_diary');
	var sql = 'SELECT * FROM '+table1+ ' WHERE author_id='+id;
	alert(sql);
	authorCollection.fetch({ query: sql});
	if(authorCollection.length>0){
		var model = authorCollection.at(0);
		model.destroy();
	}
	return false;
}

function getDate(nameBtn_evt){
	alert(nameBtn_evt.source.id);
	id= nameBtn_evt.source.id;
	contentCollection = Alloy.Collections.instance('viewDiary');
	
	var tblView = Ti.UI.createTableView();
	var sql = 'SELECT * FROM '+table+' WHERE content_id='+id;
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
	return false;
}

function getNotes(list_evt){
	var notes = list_evt.source.notes;
	//var dates = list_evt.source.title;
	var win = Ti.UI.createWindow({ backgroundImage: '/images/bg.jpg' });
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
	var val = textField.value;
	textField.addEventListener('change', function(e){ val = textField.value;});
	
	var backBtn = Ti.UI.createButton({ top: 20, left: 5, width: 60, height: 60, backgroundImage: '/images/back-button.png', });
	backBtn.addEventListener('click', function(e){ win.close(); $.viewDiary.open(); });
	
	var editBtn = Ti.UI.createButton({ top: 20, left: 50, width: 60, height: 60, backgroundImage: '/images/edit1.png'});
	editBtn.addEventListener('click', function(e){ textField.enabled=true; alert('You may now edit your diary!'); });
	

	var saveBtn = Ti.UI.createButton({ top: 20, left: 100, width: 60, height: 60, backgroundImage: '/images/save.png', });
	saveBtn.addEventListener('click', function() {saveChanges(val,list_evt.source.title,list_evt.source.c_id,list_evt.source);});
	
	win.add(backBtn);
	win.add(editBtn);
	win.add(saveBtn);
	
	win.add(textField);
	$.viewDiary.close();
	win.open();
	return false;
}

function saveChanges(value,date,id,list_evt){
	contentCollection = Alloy.Collections.instance('viewDiary');
	var sql = 'SELECT * FROM ' +table+ ' WHERE content_id="' +id+ '" AND date="' +date+'"';
	contentCollection.fetch({ query: sql});
		
		var model = contentCollection.at(0);
		model.set({
			'content': value
		}).save();
		if(contentCollection){
		alert('Successfully Updated!');
		getNotes(list_evt);
		}
		return false;
}

init();