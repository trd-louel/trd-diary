exports.definition = {
	config: {
		
		adapter:{
			"type": "sql",
			"collection_name":"contents",
			"db_file": "/dbTest.sqlite",
			"db_name": "dbTest",
			"idAttribute":"content_id",
			"remoteBackup":false
		}
	}
};