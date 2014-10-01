var authorCollection = Alloy.createCollection('db_diary');
var table1 = authorCollection.config.adapter.collection_name;

var contentCollection = Alloy.createCollection('viewDiary');
var table = contentCollection.config.adapter.collection_name;

function getDate() 
{
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
 
 	switch(month)
 	{
 		case 1:
 		case 01:
 			month = "January";
 			break;
 		case 2:
 		case 02:
 			month = "February";
 			break;
 		case 3:
 		case 03:
 			month = "March";
 			break;
 		case 4:
 		case 04:
 			month = "April";
 			break;
 		case 5:
 		case 05:
 			month = "May";
 			break;
 		case 6:
 		case 06:
 			month = "June";
 			break;
 		case 7:
 		case 07:
 			month = "July";
 			break;
 		case 8:
 		case 08:
 			month = "August";
 			break;
 		case 9:
 		case 09:
 			month = "September";
 			break;
 		case 10:
 			month = "October";
 			break;
 		case 11:
 			month = "November";
 			break;
 		case 12:
 			month = "December";
 	}
 	
	 	if (day < 10)
	 	{
	 		day = "0" + day;
	 	}
		if (hours < 10) 
		{ 
			hours = "0" + hours;
		}
		 
		if (minutes < 10) 
		{ 
			minutes = "0" + minutes;
		}

	return month + " " + day + ", " + year + " -  " + hours + ":" + minutes;
}

$.addTitle.value = getDate();

function saveDiary()
{
	var note = $.addNotes.value;
	
	if(note.trim().length > 0)
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
					var db = Ti.Database.open('db3');
					var sql = "INSERT INTO author_info (author_id, name) VALUES (?, ?);";
					db.execute(sql, null, dialog_evt.text);
				}
				else
				{
					Titanium.UI.createAlertDialog({title:'Task not added',message:'Task cannot be empty.'}).show();
				}
			}
		});
		dialog.show();
	
		alert('Note added.');
		//$.addDiary.close();
	}
	else
	{
		alert('Please type something.');
	}
	
}