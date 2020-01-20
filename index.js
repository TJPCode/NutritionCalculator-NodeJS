const readline = require('readline');
const handler = require('./handler');
const http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

app.use(express.static(__dirname + '/views'));

app.set('view engine','ejs')
app.listen(3000);

console.log("Server running on http://127.0.0.1:3000/");

app.get('/', function (req, res) {
    var data = handler.getAllFoods();
    console.log(data);
    res.render('nutritionCalculator',data);
});


app.post('/', urlencodedParser, function (req, res) {
    
    var data = handler.searchFood(req.body.search);
    console.log(data);
    res.render('nutritionCalculator', data);  
})








/*
var server = http.createServer(function(req,res){
    console.log(handler.getAllFoods());
    res.write(handler.getAllFoods());
    //res.end("test");
}).listen(3000);

console.log("Server running on http://127.0.0.1:3000/");


*/




















//https://www.youtube.com/watch?v=rin7gb9kdpk



//https://www.youtube.com/watch?v=Sb8xyCa2p7A
/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Etsi ruoka: ", (answer) => { 
    console.log(handler.searchFood(answer));
    rl.close(); 
});

rl.question("Lisää ruoka: ", (newFood) => {
    
    handler.addFood(newFood);
    rl.close();
    
});

rl.question("Päivitä ruoka: ", (foodString) => {
    
    handler.updateFood(foodString);
    rl.close();
    
});
*/
//console.log("------------------------")