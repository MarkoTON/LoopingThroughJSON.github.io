// Uzimanje vrednosti
function run() {
  let idInput = Number(document.getElementById("selector").value);
  onClickPrint(idInput);
}

// Pozivanje funkcije koja stampa rezultat
function onClickPrint(value){
  // Hvatanje JSON-a i konvertovanje
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhttp.responseText);
      
      let peoples = response;
      let outputPerson = '';
      let outputFriOfPerson = '';
      let outputFriOfFriPerson = '';
      let sugestion = '';
      
      //// Looping kroz objekte osoba
      let i;
      let m;
      let sumOfArrays = [];
      for( i = 0;i < peoples.length; i++){
        if(i === value){
          // Stampanje podataka o osobi
          outputPerson += `<h1>${peoples[i].firstName} ${peoples[i].surname}</h1> 
          <p>is ${peoples[i].age} old.</p>
          <p>Gender: <b>${peoples[i].gender}.</b></p>
          <hr>
          <div class="row">
          <div class="col-md-6">
          <p class="d-inline"><b>Friends of ${peoples[i].firstName} ${peoples[i].surname} : </b></p>
          </div>
          <div class="col-md-6">
          <p class="d-inline"><b>Friends of friends ${peoples[i].firstName} ${peoples[i].surname} : </b></p>              
          </div>
          </div>
          <hr>
          `;
          
          //// Looping kroz prijatelje izabrane osobe
          let r;
          for( r = 0; r < peoples[i].friends.length; r++){
            let friendsID = peoples[i].friends[r];
            
            // Stampanje prijatelja izabrane osobe (Korak 2)
            outputFriOfPerson += `
            <h4 class="green">${peoples[friendsID - 1].firstName} ${peoples[friendsID - 1].surname}</h4>
            <!--<p>is ${peoples[friendsID - 1].age} old.</p>
            <p>Gender: <b>${peoples[friendsID - 1].gender}.</b></p>
            <hr>
            <p>${peoples[friendsID - 1].firstName} ${peoples[friendsID - 1].surname} are friends with ${peoples[i].firstName} ${peoples[i].surname} </p>-->
            <hr>
            `;
          }
          
          //// Looping kroz prijatelje izabrane osobe
          for( m = 0; m < peoples[i].friends.length; m++){
            sumOfArrays.push(peoples[m].friends);
          }
          
          let newUserArray = Array.prototype.concat(...sumOfArrays);
          console.log(newUserArray);
          let reduceUsersArray = newUserArray.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
          
          reduceUsersArray.forEach(function(nameUser){
            // Stampanje prijatelja izabrane osobe
            outputFriOfFriPerson += `
            <h4 class="blue">${peoples[nameUser].firstName} ${peoples[nameUser].surname}</h4><hr>
            `;
            console.log(peoples[nameUser].firstName);
          });
          

          let doubleUsers = newUserArray.slice().sort();
          let doubleFriendsOfUsers = [];
          for (let i = 0; i < doubleUsers.length - 1; i++) {
            if (doubleUsers[i + 1] == doubleUsers[i]) {
              doubleFriendsOfUsers.push(doubleUsers[i]);
            }
          }

          doubleFriendsOfUsers.forEach(function(sugestionUser){
            // Stampanje predlozenog prijatelja
            sugestion += `
            <h4 class="red">${peoples[sugestionUser].firstName} ${peoples[sugestionUser].surname}</h4><hr>
            `
            console.log(peoples[sugestionUser].firstName);
          })
          
          // console.log(doubleFriendsOfUsers);
          
        }
        document.getElementById('people').innerHTML = outputPerson; // r
        document.getElementById('people2').innerHTML = outputFriOfPerson; // m
        document.getElementById('people3').innerHTML = outputFriOfFriPerson;
        document.getElementById('people4').innerHTML = sugestion;
      }
      
    }
  };
  xhttp.open("GET", "json/data.json", true);
  xhttp.send();
}