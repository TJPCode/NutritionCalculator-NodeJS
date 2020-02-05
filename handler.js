const fileName = 'newFoodData.txt';
const fs = require('fs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const data = fs.readFileSync(fileName) 
const json = JSON.parse(data)

var mongoose = require('mongoose');
var Foods = require('./foodModel');

const nutritions = json.foods

//Get all foods.
function getAllFoods(){
    return json; 
}

//Search food using keyword
var searchFood = function(answer){

    for(var foodItem in nutritions) {

        if (nutritions[foodItem].name.toLowerCase() ==  answer.toLowerCase()){
            return {message: "Food found.", food: nutritions[foodItem]};
        }
    }
    return {message: "Food not found."};
}

//Add new food item
var insertFood = function(newFood){

    console.log(newFood);
    //Generate new id.
    var newId = Math.max.apply(Math, nutritions.map(function(o) { return o.id; })) + 1;

    var foodObject = {
        id: newId,
        name: newFood.foodname,
        kcal: parseInt(newFood.foodkcal),
        prots: parseInt(newFood.foodprot),
        carbs: parseInt(newFood.foodcarbs),
        fat: parseInt(newFood.foodfat),
        sfat: parseInt(newFood.foodsfat),
        category: parseInt(newFood.foodcategory),
        info: newFood.foodinfo
    }
  
    //add new object to json array
    json.foods.push(foodObject)

    fs.writeFile(fileName, JSON.stringify(json, null, 3), function (err) {  
        if (err) {
            console.log("error");
        }  
        else {
            console.log("Ruoka " + newFood.foodname + " lisätty ja tiedosto päivitetty.");
        }      
    });

}

//Update food data
function updateFood(food){

    var foodString = foodString.split(",")
    var foodId = foodString[0]
    var newName = foodString[1]
    var updated = false;

    json.foods.forEach(element => {
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

function deleteFood(foodId){

    for(var foodItem in nutritions) {
        
        if (json.foods[foodItem].id == parseInt(foodId)){
            delete json.foods[foodItem];
            updateJson(json)
            break;
        }
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
module.exports.insertFood = insertFood
module.exports.updateFood = updateFood
module.exports.deleteFood = deleteFood