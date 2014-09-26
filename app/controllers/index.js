$.navigation.open();

function btnView(e){
	var getAuthors = Alloy.createController('viewDiary').getView();
	$.navigation.openWindow(getAuthors);
}

function btnAdd(e){
	var addDiary = Alloy.createController('addDiary').getView();
	$.navigation.openWindow(addDiary);
}
