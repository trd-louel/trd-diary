exports.definition = {
	config: {
		
		adapter:{
			"type": "sql",
			"collection_name":"contents",
			"db_file": "/db_test.sqlite",
			"db_name": "db_test",
			"idAttribute":"content_id",
			"remoteBackup":false
		}
	}
};