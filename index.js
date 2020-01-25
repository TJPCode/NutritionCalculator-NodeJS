const port = process.env.PORT || 3000;
const readline = require('readline');
const handler = require('./handler');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var reload = require('reload');
const Joi = require('@hapi/joi');
var app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('port', port);



//Load calculator page.
app.get('/', function (req, res) {
    var allFoodData = handler.getAllFoods();
    console.log("Starting...");
    res.render('nutritionCalculator', allFoodData);
});

//Get searched food.
app.get('/search', function (req, res) {
    console.log("Getting food data with search parameter '" + req.query.search +"'...");
    
    const schema = Joi.object().keys({
        search: Joi.string().min(1).required(),
    });

    const {error} = schema.validate(req.query);
    if (error) return res.render('searchResults', {result: error});
    
    var foundData = handler.searchFood(req.query.search);
    console.log(foundData);
    res.render('searchResults', {result: foundData});
});



//Automaticly reloads web pages when saving server side code.
reload(app).then(function (reloadReturned) {
 
    server.listen(app.get('port'), function () {
        console.log(`Server running on http://127.0.0.1:3000/ on port ${port}.`)
    })

  }).catch(function (err) {
    console.error('Reload could not start, could not start server. ', err)
  })


/*
app.post('/', urlencodedParser, function (req, res) {
    
    var data = handler.searchFood(req.body.search);
    console.log(data);
    res.render('nutritionCalculator', data);  
})
*/


//https://www.youtube.com/watch?v=rin7gb9kdpk

//https://www.youtube.com/watch?v=Sb8xyCa2p7A