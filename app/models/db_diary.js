exports.definition = {
	config: {
		
		adapter:{
			"type": "sql",
			"collection_name":"author_info",
			"db_file": "/db_test.sqlite",
			"db_name": "db_test",
			"idAttribute": "author_id",
			"remoteBackup":false
		}
	}
};