
const fileName = 'foodData.txt';
const fs = require('fs')
const data = fs.readFileSync(fileName) 
const json = JSON.parse(data)

const nutritions = json.JsonRavinnot

//Get all foods.
function getAllFoods(){
    return json; 
}

//Search food using keyword
var searchFood = function(answer){

    for(var foodItem in nutritions) {

        if (nutritions[foodItem].name.toLowerCase() ==  answer.toLowerCase()){
            return nutritions[foodItem];           
        }
    }
}

//Add new food item
var addFood = function(newFood){

    //Generate new id.
    var newId = Math.max.apply(Math, nutritions.map(function(o) { return o.id; })) + 1;

    var foodObject = {
        id: newId,
        name: newFood
    }

    //add new object to json array
    json.JsonRavinnot.push(foodObject)

    fs.writeFile(fileName, JSON.stringify(json, null, 4), function (err) {  
        if (err) {
            console.log("error");
        }  
        else {
            console.log("Ruoka " + newFood + " lisätty ja tiedosto päivitetty.");
        }      
    });

}

//Update food data
function updateFood (foodString){

    var foodString = foodString.split(",")
    var foodId = foodString[0]
    var newName = foodString[1]
    var updated = false;

    json.JsonRavinnot.forEach(element => {
        //console.log(element);

        if (element.id == foodId) {
            element.name = newName;
            updated = true;
        }
    }); 

    if (updated) {
        updateJson(json)
    }
    else {
        console.log("Ruoka ei löytynyt päivitettäväksi id:llä " + foodId);
    }
}


function updateJson(json){

    fs.writeFile(fileName, JSON.stringify(json, null, 4), function (err) {  
        if (err) {
            console.log("error");
        }  
        else {
            console.log("Ruoka päivitetty ja tiedosto päivitetty.");
        }      
    });

}

module.exports.getAllFoods = getAllFoods
module.exports.searchFood = searchFood
module.exports.addFood = addFood
module.exports.updateFood = updateFood