//https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/
//https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make

//Show selected food data.
 function foodSelected(json, callerId) {

    var data = JSON.parse(json);

    if (data != 'undefined' && data) {

        var selectList = document.getElementById(callerId);
    
        for (obj of data) {
            if (selectList.options[selectList.selectedIndex].value == obj.id){
                document.getElementById("foodid").value = obj.id;
                document.getElementById("foodname").value = obj.name;
                document.getElementById("foodkcal").value = obj.kcal;
                document.getElementById("foodprot").value = obj.prots;
                document.getElementById("foodcarbs").value = obj.carbs;
                document.getElementById("foodfat").value = obj.fat;
                document.getElementById("foodsfat").value = obj.sfat;
                document.getElementById("foodcategory").selectedIndex  = obj.category;
                document.getElementById("foodinfo").value = obj.info;
                document.getElementById("insertButton").disabled  = true;
                break;
            }       
        }  
    }
 };

 //Calculate selected food to total amounts.
 function selectAndCalculate(json, callerId) {

    var data = JSON.parse(json);

    if (data != 'undefined' && data) {

        var selectList = document.getElementById(callerId);
    
        for (obj of data) {
            if (selectList.options[selectList.selectedIndex].value == obj.id){
                document.getElementById("totkcal").value = parseInt(document.getElementById("totkcal").value) + parseInt(obj.kcal);
                document.getElementById("totprot").value = parseInt(document.getElementById("totprot").value) + parseInt(obj.prots);
                document.getElementById("totcarb").value = parseInt(document.getElementById("totcarb").value) + parseInt(obj.carbs);
                document.getElementById("totfat").value = parseInt(document.getElementById("totfat").value) + parseInt(obj.fat);
                document.getElementById("totsfat").value = parseInt(document.getElementById("totsfat").value) + parseInt(obj.sfat);
            
                var calculatedList = document.getElementById("selectedfoods");
                var option = document.createElement("option");
                option.text = obj.name;
                option.value = obj.id;  
                calculatedList.add(option);           
                break;
            }       
        }  
    }

 };

 //Reset calculated sum data.
 function resetCalculated() {
  document.getElementById("totkcal").value = 0;
  document.getElementById("totprot").value = 0;
  document.getElementById("totcarb").value = 0;
  document.getElementById("totfat").value = 0;
  document.getElementById("totsfat").value = 0;
  document.getElementById("selectedfoods").options.length = 0;
 };

 //Reset calculated sum data.
 function resetToAdd() {
  document.getElementById("foodid").value = "";
  document.getElementById("foodname").value = "";
  document.getElementById("foodkcal").value = "";
  document.getElementById("foodprot").value = "";
  document.getElementById("foodcarbs").value = "";
  document.getElementById("foodfat").value = "";
  document.getElementById("foodsfat").value = "";
  document.getElementById("foodinfo").value = "";
  document.getElementById("foodcategory").selectedIndex = 0;
  document.getElementById("insertButton").disabled  = false;
 };

 //Remove food from calculated list and recalculate sums.
 function removeFromCalculated(json, removableItem) {
 
  var data = JSON.parse(json);

  if (data != 'undefined' && data) {

    for (obj of data) {
      if (removableItem.value == obj.id){
          document.getElementById("totkcal").value = parseInt(document.getElementById("totkcal").value) - parseInt(obj.kcal);
          document.getElementById("totprot").value = parseInt(document.getElementById("totprot").value) - parseInt(obj.prots);
          document.getElementById("totcarb").value = parseInt(document.getElementById("totcarb").value) - parseInt(obj.carbs);
          document.getElementById("totfat").value = parseInt(document.getElementById("totfat").value) - parseInt(obj.fat);
          document.getElementById("totsfat").value = parseInt(document.getElementById("totsfat").value) - parseInt(obj.sfat);            
          
          var calculatedList = document.getElementById("selectedfoods");
          calculatedList.remove(removableItem.selectedIndex);
          break;
      }       
    }  
  }
};