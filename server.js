// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//var CreateSitemap = require("./createsitemap.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Start server listening
app.listen(PORT, () => console.log('Saaats Mini app listening on port ' + PORT));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log(req.body.baseurl)
});


//ROUTES =============================================================
//Basic route that sends the user first to the AJAX Page
app.use('/static', express.static('app/public'));

//Get controllers for other routes
require("./app/controllers/apiController")(app);
//require("./routes/htmlRoutes")(app);


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/index.html"));
  console.log("homepage loaded");
});

app.get("/sitemap", function(req, res) {
  res.sendFile(path.join(__dirname, "/sitemap.xml"));
  console.log("sitemap downloaded");
});

/*
app.post("/newsitemap", function (req, res) {
    console.log(req.body.baseurl)

});

*/