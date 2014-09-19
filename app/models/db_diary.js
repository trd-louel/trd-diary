alert("sdjkflk");
exports.definition = {
	config: {
		
		adapter:{
			"type":"sql",
			"collection_name":("author_info"),
			"db_file": "/diary.sqlite",
			"db_name": "diary",
			"idAttribute": "author_id",
			"remoteBackup":false
		}
	}
};