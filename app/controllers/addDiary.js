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
					
			
				}
				else
				{
					Titanium.UI.createAlertDialog({title:'Task not added',message:'Task cannot be empty.'}).show();
				}
			}
		});
		dialog.show();
	
	
		//saveNotes(note.text.trim());
		//getToDo();
			
		alert('Note added.');
		$.addDiary.close();
	}
	else
	{
		alert('Please type something.');
	}
	
}