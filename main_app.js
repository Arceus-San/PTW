var MongoClient = require("mongodb").MongoClient;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const DB_NAME = "test";
const COLLECTION_NAME = "data";
const url = "mongodb://localhost/"+DB_NAME;

var database = require("./databases/locatifs.json");

app = express();

app.use(express.static(__dirname + "/pages"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, {useNewUrlParser : true}, function(err, db){
	if (err) throw err;
	console.log("Connected to database...");

	var dbo = db.db(DB_NAME); 

	dbo.collection(COLLECTION_NAME).countDocuments({}, function(err, count){
		if (err) throw err;

		if(count == 0){
			dbo.createCollection(COLLECTION_NAME, function(err, res){
				if (err) throw err;
				console.log("Creating collection...");
				console.log(res);

				db.close();
				/*dbo.collection(COLLECTION_NAME).insertMany(database, function(err, res){
					console.log("Populating the database...");
					console.log(res);
				});*/
			});
		}
	
	/*var meubles;

	dbo.collection(COLLECTION_NAME).find({"fields.type":"Meublés"}).toArray((err, res) => {
		meubles = res;
		console.log(meubles[0]);
	});*/
	
	});

	console.log("DONE");
});


app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "pages/site.html"));
});


app.post("/add", (req,res) => {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		obj = req.body;
		obj.anotherOne = "yesyesyes";

		console.log("Connecting to database...");
		var dbo = db.db(DB_NAME);

		dbo.collection(COLLECTION_NAME).insertOne(obj, (err, res) => {
			if (err) throw err;

			console.log("line added !");

			dbo.collection(COLLECTION_NAME).find().toArray((err, res) => {
				console.log(res.length);
				db.close();
			});
		});

		
	});
	console.log(req.body);
	res.redirect("/");

});


app.post("/sendingData", (req, res) => {
	console.log("mkjlkjmjl");

	console.log(req.body);

});






app.listen(8000, () => {console.log("Connected to localhost on port 8000");});