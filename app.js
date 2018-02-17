var express = require('express');
var app = express();

app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){

    //set default variables
    var TotalObjectsOnPage=500,
        pageSize = 8,
        pageCount = 500/8,
        currentPage = 1,
        objects = [],
        objectsArray = [],
        objectList = [];

    //genreate list of objects
    for (var i = 1; i < TotalObjectsOnPage; i++) {
        objects.push({name: 'Student Number ' + i});
    }

    //split list of objects into pages
    while (objects.length > 0) {
        objectsArray.push(objects.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    //show list of objects from pages
    objectList = objectsArray[+currentPage - 1];

    //render index.ejs view file
    res.render('index', {
        students: objectList,
        pageSize: pageSize,
        totalStudents: TotalObjectsOnPage,
        pageCount: pageCount,
        currentPage: currentPage
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});