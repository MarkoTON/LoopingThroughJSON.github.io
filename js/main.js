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
      let p;
      let u;
      
      let firstPerson;
      let directFriendIDs = [];//Sadrzi listu prvih prijatelja
      let fofIDs = [];//Sadrzi listu rijatelja od prijatelja
      let sugestionIDs = [];
      for( i = 0;i < peoples.length; i++){
        if(i === value){
          
          // Stampanje podataka o osobi
          outputPerson += `<h1>${peoples[i].firstName} ${peoples[i].surname}</h1> 
          <p>is ${peoples[i].age} old.</p>
          <p>Gender: <b>${peoples[i].gender}.</b></p>
          <hr>
          `;
          firstPerson = peoples[i];
          
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
            directFriendIDs.push(peoples[i].friends[r]);
          }
          
          //// Looping kroz prijatelje izabrane osobe
          for( m = 0; m < directFriendIDs.length; m++){
            for (let j = 0; j < peoples.length; j++) {
              if (directFriendIDs[m] === peoples[j].id) {
                for (let l = 0; l < peoples[j].friends.length; l++) {
                  fofIDs.push(peoples[j].friends[l]);
                }
              }
            }
          }
          // console.log(fofIDs);
          
          let newUserArray = Array.prototype.concat(...fofIDs);
          
          // console.log(newUserArray);
          sugestionIDs = newUserArray;
          
          let reduceUsersArray = newUserArray.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
          // console.log(reduceUsersArray);
          
          for(p = 0; p < directFriendIDs.length; p++){
            for(u = 0; u < reduceUsersArray.length; u++){
              let index = reduceUsersArray.indexOf(directFriendIDs[p]);
              let indexMain = reduceUsersArray.indexOf(firstPerson.id);
              if(index > -1){
                reduceUsersArray.splice(index, 1);
              }
              if(indexMain > -1){
                reduceUsersArray.splice(indexMain, 1);
              }
            }
          }
          console.log(reduceUsersArray);
          
          for(p = 0; p < directFriendIDs.length; p++){
            for(u = 0; u < sugestionIDs.length; u++){
              let index = sugestionIDs.indexOf(directFriendIDs[p]);
              let indexMain = sugestionIDs.indexOf(firstPerson.id);
              if(index > -1){
                sugestionIDs.splice(index, 1);
              }
              if(indexMain > -1){
                sugestionIDs.splice(indexMain, 1);
              }
            }
          }
          console.log(sugestionIDs);
          
          reduceUsersArray.forEach(function(nameUser){
            // Stampanje prijatelja izabrane osobe
            outputFriOfFriPerson += 
            '<h4 class="blue">' + peoples[nameUser-1].firstName + ' ' + peoples[nameUser-1].surname + '</h4><hr>'
            ;
            // console.log(peoples[nameUser-1].firstName);
          });
          
          let takeSugestionIDs = sugestionIDs.slice().sort();
          let resultsOfIDs = [];
          for (let h = 0; h < takeSugestionIDs.length - 1; h++) {
            if (takeSugestionIDs[h + 1] == takeSugestionIDs[h]) {
              resultsOfIDs.push(takeSugestionIDs[h]);
            }
          }
          console.log(resultsOfIDs);
          
          //// Predlozeni prijatelji
          resultsOfIDs.forEach(function(index){
            // Stampanje predlozenog prijatelja
            sugestion += '<h4 class="red">' + peoples[index-1].firstName + ' ' + peoples[index-1].surname + '</h4><hr>'
            ;
          })
          
          
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