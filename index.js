const readline = require('readline');
const handler = require('./handler');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const reload = require('reload');
const Joi = require('@hapi/joi');

var app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT || 3000;
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


app.post('/modify', urlencodedParser, function (req, res) {

    //Not so good way to handle what do but...
    if (req.body.Update == 'Update') {
        handler.updateFood(req.body);
        console.log("Food '" + req.body.foodname + "' updated.");
    }
    else if (req.body.Insert == 'Insert'){
        handler.insertFood(req.body);
        console.log("Food '" + req.body.foodname + "' inserted.");
    }
    else if (req.body.Delete == 'Delete'){      
        handler.deleteFood(req.body.foodid);
        console.log("Food '" + req.body.foodname + "' deleted.");
    }
  
    //Load updated data.
    var allFoodData = handler.getAllFoods();
    res.render('nutritionCalculator', allFoodData);  
})


//Automaticly reloads web pages when saving server side code.
reload(app).then(function (reloadReturned) {
 
    server.listen(app.get('port'), function () {
        console.log(`Server running on http://127.0.0.1:3000/ on port ${port}.`)
    })

  }).catch(function (err) {
    console.error('Reload could not start, could not start server. ', err)
  })





//https://www.youtube.com/watch?v=rin7gb9kdpk

//https://www.youtube.com/watch?v=Sb8xyCa2p7A