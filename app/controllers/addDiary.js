var authorCollection = Alloy.createCollection('db_diary');
var table1 = authorCollection.config.adapter.collection_name;

var contentCollection = Alloy.createCollection('viewDiary');
var table = contentCollection.config.adapter.collection_name;

function getDate(i)
{
	if(i>=0&&i<=11)
	{
		var monthStrArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		return monthStrArr[i];
	}
	else
	{
		return '-';
	}
}

function back(e) 
{
	$.addDiary.close();
}

function saveDiary()
{
	var header = $.addTitle.value;
	var note = $.addNotes.value;
	
	if(note.trim().length > 0 && header.trim().length > 0)
	{
		var newDate = new Date();
		
		//add codes here
		var dialog = Ti.UI.createAlertDialog({
			title		: 'Author Name',
			style		: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames	: ['Ok', 'Cancel'],
			cancel		: 1
		});
	
		dialog.addEventListener('click', function(dialog_evt) {
			if(dialog_evt.index === 0)
			{
				if(dialog_evt.text.trim().length > 0)
				{
					saveAuthor(dialog_evt.text.trim());
					//getNotes();
					//Titanium.UI.createAlertDialog({title:'Task added',message:'Task added successfully'}).show();
				}else{
					Titanium.UI.createAlertDialog({title:'Task not added',message:'Task cannot be empty.'}).show();
				}
			}
		});
		dialog.show();
	
	
		//saveNotes(note.text.trim());
		//getToDo();
			
		alert('Note added.');
	}
	else
	{
		alert('Please type something.');
	}
	
}

function saveAuthor(authorName)
{
	authorCollection = Alloy.Collections.instance('db_diary');
	authorCollection.fetch();
	
	var authorTemp = Alloy.createModel('db_diary',
	{
		'title' : authorName,
		'id' : id
	});
	
	authorCollection.add(authorTemp);
	authorTemp.save();
	
	/*
	contentCollection = Alloy.Collections.instance('viewDiary');
	contentCollection.fetch();
	
	var saveModel = Alloy.createModel('viewDiary',
	{
		
	});
	
	contentCollection.add(saveModel);
	saveModel.save();*/
}



/*
function getNotes()
{
	contentCollection = Alloy.Collections.instance('viewDiary');
		contentCollection.fetch({ 
			query: sql
		});
		
		var sql = 'SELECT * FROM '+table+' WHERE content_id='+id;
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
			//list.addEventListener('click', getNotes);
			dateArr.push(list);
		
}
*/
