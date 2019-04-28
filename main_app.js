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


function createCollection(database, json, collection_name, closing_db){
		closing_db = closing_db || false;

		var dbo = database.db(DB_NAME);

		dbo.collection(collection_name).countDocuments({}, function(err, count){
			if (err) throw err;

			if(count == 0){
				console.log("Creating collection "+collection_name+"...");

				dbo.createCollection(collection_name, function(err, res){
					if (err) throw err;

					console.log("Populating "+collection_name+"...");
					
					dbo.collection(collection_name).insertMany(json, function(err, res){
						if(closing_db){database.close();}
						
						console.log("Collection "+collection_name+" created and populated!");
					
					});
				});
			}
		
		});


}


function createAllCollections(database){
	createCollection(database, hotels, "hotels");
	createCollection(database, campings, "campings");
	createCollection(database, locatifs, "locatifs");
	createCollection(database, activites, "activites");
	createCollection(database, degustations, "degustations");
	createCollection(database, patrimoine, "patrimoine", true);
}


function createDatabase(){
	MongoClient.connect(url, {useNewUrlParser : true}, function(err, db){
		if (err) throw err;
		console.log("Connected to database...");

		createAllCollections(db);
		
	});
}


createDatabase();


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

	var data = req.body;

	//console.log(data.etape1)

	/*
	etape1: base à utiliser
	etape2: "fields.type" (Ajouter espace dans option Hôtel - Restaurant sinon on aura des problèmes)

	------------------------------------
	Avec la base 	LOCATIFS
	etape3: 		"fields.capacitenbchambres" --> faire gaffe au 6+
	etape4: 		"fields.capacitenbpersonnes" --> faire gaffe au 9+

	Avec la base 	CAMPINGS
	etape3: 		"fields.equipementsenlocation"
	etape4: 		"fields.services"
	
	Avec la base 	HOTELS
	etape3: 		
	etape4: 		
	-----------------------------------

	etape5: 		"fields.labelsclassement"
	etape6: 		"fields.equipements"
	etape7_1: 		"fields.departement" --> Ils sont tous en majuscules
	etape7_2: 		???
	etape7_3: 		"fields.commune"

	etapes différentes selon la base sélectionnée

	option "Autre" pour les valeurs nulles

	*/

	//filtre etape1 (sélection de la base) 
	switch(data.etape1[0]){
		case "Hébergements Locatifs": selected_collection = "locatifs"; break;
		case "Camping": selected_collection = "campings"; break;
		case "Hôtel": selected_collection = "hotels"; break;
	}

	console.log(selected_collection + " database selected!");

	console.log("DATA SENT:");
	console.log(data);

	var type_query = []

	//filtre etape2 (sélection du type)
	data.etape2.forEach((item) => {
		type_query.push({"fields.type": item});
	});


	//console.log(type_query);
	var results;

	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		if (err) throw err;

		console.log("Connecting to database...");
		var dbo = db.db(DB_NAME);

		dbo.collection(selected_collection).find({$or : type_query}, {projection : {_id:0, "fields.type":1}}).toArray((err,res) => {
			results = res;
			console.log(res);
		});

		
	});



	//filtre etape3 (sélection du nombre de chambres pour les locatifs, hébergements pour les campings)

	//filtre etape4 (sélection du nombre de personnes pour les locatifs, services disponibles pour les campings)

	//filtre etape5 (sélection du nombre d'étoiles de l'hébergement)

	//filtre etape6 (sélection des équipements)

	//filtre etape7_1 (sélection du département)

	//filtre etape7_2 ???

	//filtre etape7_3 (sélection de la ville)

	res.send();

});

app.post("/getLocatifs", (req,res) => {
	res.send(locatifs);
});

app.post("/getHotels", (req,res) => {
	res.send(hotels);
});

app.post("/etape1", (req,res) => {
	console.log(req.body);
	res.send();
});


app.listen(8000, () => {console.log("Connected to localhost on port 8000");});