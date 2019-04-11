var http = require('http');
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;
var express = require('express');


const DB_NAME = "hebergements";
const url = "mongodb://localhost/"+DB_NAME;

var database = require("./databases/hebergements_data.json");

var bodyParser = require('body-parser');


app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose_demo', {useNewUrlParser : true});

var db = mongoose.connection;*/

MongoClient.connect(url, {useNewUrlParser : true}, function(err, db){
	if (err) throw err;
	console.log("YES");
	//console.log(db.db("mongoose_demo"));
	var dbo = db.db(DB_NAME); 

	dbo.collection("data").countDocuments({}, function(err, count){
		if (err) throw err;

		if(count == 0){
			dbo.createCollection("data", function(err, res){
				if (err) throw err;
				console.log("Creating collection...");
				console.log(res);

				dbo.collection("data").insertMany(database, function(err, res){
					console.log("population de la base de données...");
					console.log(res);
				});
			});
		}
	
	var meubles;

	dbo.collection("data").find({"fields.type":"Meublés"}).toArray((err, res) => {
		meubles = res
		console.log(meubles[0]);
	});
	
	});
});


http.createServer(function (req, res) {
	fs.readFile('/pages/main_page.html', function(err, data){
		if (err) throw err;
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
}).listen(3000);