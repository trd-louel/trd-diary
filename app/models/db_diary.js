exports.definition = {
	config: {
		
		adapter:{
			"type": "sql",
			"collection_name":"author_info",
			"db_file": "/db3.sqlite",
			"db_name": "db3",
			"idAttribute": "author_id",
			"remoteBackup":false
		}
	}
};