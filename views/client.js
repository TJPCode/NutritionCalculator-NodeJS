//https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/


//This is called by food select lists.
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
                document.getElementById("foodcategory").value = obj.category;
                document.getElementById("foodinfo").value = obj.info;
                break;
            }       
        }  
    }
 };

 //Calculates selected food to total amounts.
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
                break;
            }       
        }  
    }

 };

 function reset() {
    document.getElementById("totkcal").value = 0;
    document.getElementById("totprot").value = 0;
    document.getElementById("totcarb").value = 0;
    document.getElementById("totfat").value = 0;
    document.getElementById("totsfat").value = 0;

 };