var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var database = require("./databases/locatifs.json");

const DB_NAME = "test";
const url = "mongodb://localhost/"+DB_NAME;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(url, {useNewUrlParser : true}, (err) => {
	if (err) throw err;

	console.log("Database connected !");
});

var testSchema = mongoose.Schema({
	param1 : String,
	param2 : String,
	param3 : String
});


var Test = mongoose.model("Test", testSchema, "data");


app.get("/", (request, response) => {
	response.sendFile(path.resolve(__dirname, "pages/main_page.html"));

})


app.post("/", (req,res) => {
	new Test(req.body).save((err) => {
		if (err) throw err;
		console.log("test added !");
		Test.find().then(profiles => console.log(profiles.length))
	})

	//console.log(req.body);
	res.redirect("/");

})

app.listen(8000, () => {console.log("Connected to localhost on port 8000");});