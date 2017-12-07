//VARIABLES -------------------------------------------------------------
const SitemapGenerator = require('sitemap-generator');
var xml2js = require('xml2js');
var fs = require('fs');
var moment = require('moment');


var xmlfile = "/sitemap.xml";
//var site = require("./app/data/temp.js");
//ar site = "http://nowaccount.com";

const siteURL  = require('./app/models').siteurls;


//MAIN FUNCTION --------------------------------------------------------
/*
$("#submit-site").click(function() {
	// Prevent default behavior of form submit
	event.preventDefault();

	site = $("#site-name").val().trim(); */

exports.bigfunction = function(site, callback) {

	
	
	destroyrows();

	// create generator
	var log1 = "Crawler started. Rewriting sitemap.xml for " + site + ". Please note that for large sites this can take many minutes..."
	var start = moment().format();
	var log2 =console.log("Crawler started at " + start);
	const generator = SitemapGenerator(site, {
	  stripQuerystring: false
	});

	//var results = getPaths();

	// register event listeners
	generator.on('done', () => {
	  // sitemaps created
	  console.log("Crawler is done");
	  //console.log("Paths: " + results);
	  console.log("OUTPUT XML FILE: " + generator.getPaths());
	  console.log("OUTPUT -- Pages Added: " + generator.getStats().added);
	  console.log("OUTPUT -- Pages Ignored: " + generator.getStats().ignored);
	  console.log("OUTPUT -- Pages Errored: " + generator.getStats().errored);
	  crawldone();

	  callback();
	});

	// start the crawler
	generator.start();



	//DESTROY ROWS ---------------------------------------------------
	//exports.destroyrows = function(site) {

	function destroyrows() {

	var rowcount = 0;

	siteURL.count().then(c => {
    	rowcount = c;
    	console.log('The rowcount is: ' + rowcount);

	  for (i=0; i < (rowcount + 1); i++) {
	  	var iplus = i + 1;
	  	/* fs.unlink('./app/public/screenshots/' + iplus + '.png', function(error) {
		    if (error) {
		        throw error;
		    }
		    console.log('FILE DELETED');
		}); */
	  	console.log(siteURL.screenshotPath)
		var siteurl = siteURL.destroy({ where: { id: [i] }});
		console.log("ROW DESTROYED! BOOM!");
		}

	});
	 
	//connection.end();

	}

	//FUNCTION CRAWLER DONE
	function crawldone() {
	var parser = new xml2js.Parser();
	fs.readFile(__dirname + xmlfile, function(err, data) {
	    parser.parseString(data, function (err, result) {
	    console.log('XML Parser Done');
	       // This shows the raw XML results -- console.dir(result);

	        for (i = 0; i < generator.getStats().added; i++) {
	        	console.log("URL(" + i + "): " + result.urlset.url[i].loc);
	        	var newurl = result.urlset.url[i].loc[0]
	        	console.log(newurl);
	        	//destroy any existing row
	        	
	        	//var siteurl = siteURL.destroy({ where: { id: [i] }});
	        	//build the row
	        	var siteurl = siteURL.build({id: i+1, URLid: i+1, URL: newurl})
	        	//save to db
				siteurl.save().then(() => {
				  // callbackactions
				  console.log("Item saved to DB")
				})
				siteurl.save().catch(error => {
				  // mhhh, wth!
				})
				
	        }
	        
	    var end = moment().format();
		console.log("Crawler and parsing completed at " + end);
	    });
	});
	};

//module.exports = log1


//CLOSE THE BIG FUNCTION	
};
/*
//close the submit function
});
*/



//CRAWL COMPLETE WRITE TO DB AND CONSOLE -------------------------------------------

exports.crawldone = function(site) {

const generator = SitemapGenerator(site, {
	  stripQuerystring: false
	});

var parser = new xml2js.Parser();
fs.readFile(__dirname + xmlfile, function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log('XML Parser Done');
        // This shows the raw XML results -- console.dir(result);

        for (i = 0; i < generator.getStats().added; i++) {
        	console.log("URL(" + i + "): " + result.urlset.url[i].loc);
        	var newurl = result.urlset.url[i].loc[0]
        	console.log(newurl);
        	//destroy any existing row
        	
        	//var siteurl = siteURL.destroy({ where: { id: [i] }});
        	//build the row
        	var siteurl = siteURL.build({id: i+1, URLid: i+1, URL: newurl})
        	//save to db
			siteurl.save().then(() => {
			  // callbackactions
			  console.log("Item saved to DB")
			})
			siteurl.save().catch(error => {
			  // mhhh, wth!
			})
			
        }
        
        var end = moment().format();
  		console.log("Crawler and parsing completed at " + end);

        
    });
});

};


//DESTROY ROWS ---------------------------------------------------
exports.destroyrows = function(site) {

	connection.connect();
	var rowcount = 0;
	 
	connection.query('SELECT count(*) FROM siteurls;', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	  rowcount = results[0]['count(*)'];
	  console.log('The rowcount is: ' + rowcount);

	  for (i=0; i < (rowcount + 1); i++) {
	  	var iplus = i + 1;
	  	/* fs.unlink('./app/public/screenshots/' + iplus + '.png', function(error) {
		    if (error) {
		        throw error;
		    }
		    console.log('FILE DELETED');
		}); */
	  	console.log(siteURL.screenshotPath);
		var siteurl = siteURL.destroy({ where: { id: [i] }});
		console.log("ROW DESTROYED! BOOM!");
		}

	});
	 
	//connection.end();

}
