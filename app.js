var express = require('express');
var app = express();

app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){


    var TotalObjectsOnPage=500,
        pageSize = 10,
        pageCount = 500/10,
        currentPage = 1,
        objects = [],
        objectsArray = [],
        objectList = [];


    for (var i = 1; i < TotalObjectsOnPage; i++) {
        objects.push({name: 'Object number' + i});
    }


    while (objects.length > 0) {
        objectsArray.push(objects.splice(0, pageSize));
    }

    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    objectList = objectsArray[+currentPage - 1];


    res.render('index', {
        object: objectList,
        pageSize: pageSize,
        totalObjects: TotalObjectsOnPage,
        pageCount: pageCount,
        currentPage: currentPage
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});