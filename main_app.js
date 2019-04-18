var MongoClient = require("mongodb").MongoClient;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const DB_NAME = "hebergements";
const url = "mongodb://localhost/"+DB_NAME;

var selected_collection = "data";

var hotels = require("./databases/hotels.json");
var campings =	require("./databases/campings.json");
var locatifs = require("./databases/locatifs.json");
var activites = require("./databases/activites.json");
var degustations = require("./databases/degustations.json");
var patrimoine = require("./databases/patrimoine.json");

app = express();

app.use(express.static(__dirname + "/pages"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function createDatabase(json, collection_name){

	MongoClient.connect(url, {useNewUrlParser : true}, function(err, db){
		if (err) throw err;
		console.log("Connected to database...");

		var dbo = db.db(DB_NAME); 

		dbo.collection(collection_name).countDocuments({}, function(err, count){
			if (err) throw err;

			if(count == 0){
				dbo.createCollection(collection_name, function(err, res){
					if (err) throw err;
					console.log("Creating collection "+collection_name+"...");
					console.log(res);

					dbo.collection(collection_name).insertMany(database, function(err, res){
						console.log("Populating the database...");
						console.log(res);
						db.close();
					});
				});
			}
		
		});

		console.log("Collection "+collection_name+" created and poulated!");
	});

}


function createAllDatabases(){
	createDatabase(hotels, "hotels");
	createDatabase(campings, "campings");
	createDatabase(locatifs, "locatifs");
	createDatabase(activites, "activites");
	createDatabase(degustations, "degustations");
	createDatabase(patrimoine, "patrimoine");
}

createAllDatabases();

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "pages/site.html"));
});


app.post("/add", (req,res) => {
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		obj = req.body;

		console.log("Connecting to database...");
		var dbo = db.db(DB_NAME);

		dbo.collection(selected_collection).insertOne(obj, (err, res) => {
			if (err) throw err;

			console.log("line added !");

			dbo.collection(selected_collection).find().toArray((err, res) => {
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

	res.send();

});






app.listen(8000, () => {console.log("Connected to localhost on port 8000");});