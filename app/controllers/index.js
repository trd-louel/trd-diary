$.navigation.open();
function btnView(e){
	alert('asdf');
	 var getAuthors = Alloy.createController('viewDiary').getView();
	$.navigation.openWindow(getAuthors);
}


