

 function foodSelected(json) {
 

   var div = document.getElementsByClassName('printed-food')[0];
   var foodid = document.getElementById('foodid');
   var foodname = document.getElementById('foodname');

   var data = JSON.parse(json);
   /*
   var data = {
      JsonRavinnot: [
          {
              "id": 1,
              "name": "omena"
          },
          {
              "id": 2,
              "name": " kaali"
          }
      ]
  };
*/
    var selectList = document.getElementById("foodlist");
 
    for (obj of data) {
        if (selectList.options[selectList.selectedIndex].value == obj.id){
            document.getElementById("foodid").value = obj.id;
            document.getElementById("foodname").value = obj.name;
            document.getElementById("foodkcal").value = obj.kcal;
            break;
        }       
    } 

  if (typeof json == 'object' && json) {
    
  }

 }

 
//https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/