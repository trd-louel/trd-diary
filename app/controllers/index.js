$.navigation.open();

function btnView(e)
{
	 var getAuthors = Alloy.createController('viewDiary').getView();
	$.navigation.openWindow(getAuthors);
}

function btnAdd(e)
{
	 var getDiary = Alloy.createController('addDiary').getView();
	$.navigation.openWindow(getDiary);
}