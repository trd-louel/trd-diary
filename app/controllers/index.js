function addNote(e) {
	var addDiary = Alloy.createController('addDiary').getView();
	addDiary.open();
}

function viewNote(e) {
	var viewDiary = Alloy.createController('viewDiary').getView();
	viewDiary.open();
}

$.index.open();
