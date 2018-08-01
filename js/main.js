  // Value of person ID over Prompt
  // let idInput = Number(prompt("Enter person id"));
  
  // Value of person ID over Input
  // let idInput = document.getElementById("Ultra").value;
  function run() {
    let idInput = Number(document.getElementById("selector").value);
    onClickPrint(idInput);
  }
  function onClickPrint(value){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        let peoples = response.peoples;
        let outputPerson = '';
        let outputFriOfPerson = '';
        let outputFriOfFriPerson = '';
        let sugestion = '';
        
        let i;
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
            
            let m;
            for( m = 0; m < peoples[i].friends.length; m++){
              let friendsID = peoples[i].friends[m];
              
              outputFriOfPerson += `<h4 class="green">${peoples[friendsID - 1].firstName} ${peoples[friendsID - 1].surname}</h4>
              <!--<p>is ${peoples[friendsID - 1].age} old.</p>
              <p>Gender: <b>${peoples[friendsID - 1].gender}.</b></p>
              <hr>
              <p>${peoples[friendsID - 1].firstName} ${peoples[friendsID - 1].surname} are friends with ${peoples[i].firstName} ${peoples[i].surname} </p>-->
              <hr>
              `;
              let j;
              for( j = 0; j < peoples[m].friends.length; j++){
                let friendsOfFriendsID = peoples[m].friends[j];
                
                outputFriOfFriPerson += `
                <h4 class="blue">${peoples[friendsOfFriendsID - 1].firstName} ${peoples[friendsOfFriendsID - 1].surname}</h4>
                <!--<p>is ${peoples[friendsOfFriendsID - 1].age} old.</p>
                <p>Gender: <b>${peoples[friendsOfFriendsID - 1].gender}.</b></p>
                <hr>
                <p>${peoples[friendsOfFriendsID - 1].firstName} ${peoples[friendsOfFriendsID - 1].surname} are friends with ${peoples[m].firstName} ${peoples[m].surname}  </p>-->
                <hr>
                `;

              }
            }
            
          }
          document.getElementById('people').innerHTML = outputPerson;
          document.getElementById('people2').innerHTML = outputFriOfPerson;
          document.getElementById('people3').innerHTML = outputFriOfFriPerson;
          // document.getElementById('people4').innerHTML = sugestion;
        }
        
      }
    };
    xhttp.open("GET", "json/data.json", true);
    xhttp.send();
  }