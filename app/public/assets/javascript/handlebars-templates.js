// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "Handlebars-templates is ready" );

    window.updateUrlsTable = function(){
        $.getJSON( "/api/getUrls", function( data ) {
            var dataset = data;
            var datasetobj = {
                urls: dataset
            };

            console.log("TESTING --- site name is: " + dataset[0].URL);

            console.log("datasetobj: " + datasetobj.urls[0].statusCode);

            var urlstable = $("#urls-table").html();
            var source = $("#table-template").html();
            var template = Handlebars.compile(source);

            // Compile the template
            var tablecompiled = Handlebars.compile(source);

            // Pass our data to the template
            var tabledata = tablecompiled(datasetobj);

            $('.urltable').html(tabledata);

            // Grab the template script
            var sitename = $("#sitename").html();

            // Compile the template
            var sitenamecompiled = Handlebars.compile(sitename);

            // Define our data object
            var context={
                "sitename": dataset[0].URL
            };

            // Pass our data to the template
            var sitenamedata = sitenamecompiled(context);

            // Add the compiled html to the page
            $('.currentname').html("<h2>Current sitemap: " + sitenamedata + "</h2><a href='/sitemap'>Download Sitemap</a><br/><br/>");



            //END the GET function
        });
    };

    updateUrlsTable();

    //End doc ready function
});

