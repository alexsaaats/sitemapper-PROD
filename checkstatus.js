//SET CONSTANTS AND VARIABLES
const request = require("request");
const siteURL  = require('./app/models').siteurls;

var urllist = [];
var newlist = [];
var x = 0;

module.exports = function(callback){

    //GET DB URL LIST ----------------------

    siteURL.findAll({}).then(results => {
        urllist = results;
        var count = urllist.length;
        x = 0;
        newlist = [];

        console.log("COUNT: " + count);
        if(count)
            loopArray(urllist, callback);
    });

};

//CALL FUNCTIONS -------------------------------------------
//getstatus();


/*
//FUNCTION -- CHECK STATUS CODES ---------------------------------------
function getstatus() {

	connection.connect();
	 
	connection.query('SELECT URL FROM siteurls;', function (error, results, fields) {
	  if (error) throw error;
	  urllist = results;
	  var count = urllist.length;
	  console.log("COUNT: " + count);
	  //console.log("URL TEST: " + urllist[0].URL);
	  //console.log("ID TEST: " + urllist[0].id);

	  for (i=0; i < count; i++) {
	  	console.log('round: ' + i);
		request(urllist[i].URL, function (error, response, body) {
	  		//console.log('error:', error); // Print the error if one occurred
	  		console.log('Round ' + i + ' -- statusCode: ', response && response.statusCode); // Print the response status code if a response was received

	  		/*siteCode.update({statusCode: response.statusCode}, {fields: ['statusCode']}).then(() => {
	  			console.log("StatusCode updated in DB")
	  		})
	  		siteCode.update({statusCode: response.statusCode,}, {where: {id: i } });
        	
		});
	  }

	});
	 
	connection.end();

}
*/


//FUNCTION -- CHECK STATUS CODES -- NOLOOP ---------------------------------------

function loopArray(arr, callback) {

    LogSaveStatusCode(arr[x],function(){
        // set x to next item
        x++;

        // any more items in array? continue loop
        if(x < arr.length) {
            loopArray(arr, callback);
        }    else {
            callback();
            }
        
    }); 
    
}

function LogSaveStatusCode (msg,callback) {
    //This code updates the list of URLs processed, and then calls for status on each url. Once complete, it moves to next item. 

    //console.log(msg);
    //console.log(msg.URL);
    newlist.push(msg.URL);
    var curcount = newlist.length

    request(msg.URL, function (error, response, body) {
        if(!response)
            return console.log('error:', error); // Print the error if one occurred

        console.log('Round ' + curcount + ' -- statusCode: ', response && response.statusCode); // Print the response status code if a response was received

        siteURL.update({statusCode: response.statusCode,}, {where: {id: curcount } }).then(callback);

    });
};

