$.navigation.open();
function btnView(e){
	 var getAuthors = Alloy.createController('viewDiary').getView();
	$.navigation.openWindow(getAuthors);
}