var http = require('http');
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB_NAME = "hebergements";
const url = "mongodb://localhost/"+DB_NAME;

var database = require("./hebergements_data.json");

app.get("/"+DB_NAME, (request, response) => {
	response.sendFile(path.resolve(__dirname, "/pages/main_page.html"));

})

var r = mongoose.find({}, () => {})

app.post("/"+DB_NAME, (req,res) => {

	console.log(res.body);
	res.redirect("/hebergements");

})

app.listen(3456, () => {console.log("CONNECTED");});