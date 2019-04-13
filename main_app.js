var MongoClient = require("mongodb").MongoClient;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const DB_NAME = "hebergements";
const url = "mongodb://localhost/"+DB_NAME;

var database = require("./databases/hebergements_data.json");

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, {useNewUrlParser : true}, function(err, db){
	if (err) throw err;
	console.log("Connected to database...");

	var dbo = db.db(DB_NAME); 

	dbo.collection("data").countDocuments({}, function(err, count){
		if (err) throw err;

		if(count == 0){
			dbo.createCollection("data", function(err, res){
				if (err) throw err;
				console.log("Creating collection...");
				console.log(res);

				dbo.collection("data").insertMany(database, function(err, res){
					console.log("Populating the database...");
					console.log(res);
				});
			});
		}
	
	var meubles;

	dbo.collection("data").find({"fields.type":"Meublés"}).toArray((err, res) => {
		meubles = res;
		console.log(meubles[0]);
	});
	
	});

	console.log("DONE");
});


app.get("/", (request, response) => {
	response.sendFile(path.resolve(__dirname, "pages/main_page.html"));

})


app.post("/", (req,res) => {

	console.log(req.body);
	res.redirect("/");

})

app.listen(8000, () => {console.log("Connected to localhost on port 8000");});