exports.definition = {
	config: {
		
		adapter:{
			"type": "sql",
			"collection_name":"author_info",
			"db_file": "/dbTest.sqlite",
			"db_name": "dbTest",
			"idAttribute": "author_id",
			"remoteBackup":false
		}
	}
};