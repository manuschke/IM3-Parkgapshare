

// Dieses JS wird am Ende des index.html aufgerufen



//Funktion wird aufgerufen
holeUser_function();

//Funktion wird aufgerufen
holeParkplatz_function();



//Funktion wird aufgerufen
function holeUser_function() 
{
    // Wir holen die userID und den token, welche zuvor beim Login im Localstorage gespeichert wurde
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Das FormData Object ist dazu da die User ID, welche wir direkt oberhalb in die userID Variable (grau, nicht grün) gespeichert haben, zu verpacken
    // und unterhalb im body mitzugeben zur Authorisierung 
    let formData = new FormData();
    formData.append("userID", userID);

    // Der Authorization header enthält die verschlüsselte userID und token
    fetch("https://473535-3.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers:{
                    'Authorization': 'Basic ' + btoa(userID + ':' + token),
                    }
        })

        .then((res) => {

            // fals die Sitzung noch aktuell ist, erhalten wir eine Zahl zwischen 200-300 zurück (bestätigung, dass die Sitzung noch nicht abgelaufen ist)
            // Dann wird die JSON antwort verarbeitet
            if (res.status >= 200 && res.status < 300) {

                return res.json();
                // return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/Login.html"

            }

        })
        .then((var_data) => {

            // console.log(var_data);
            // Wir schreiben in den Seitentitel des index.html (Homepage) die erste Variable, welche wir vom Server zurück erhalten, also den Namen.
            document.querySelector("#username").innerHTML = var_data[0].name;

        })
}




function holeParkplatz_function()
{
 // Wir holen die userID und den token, welche zuvor beim Login im Localstorage gespeichert wurde
 let userID = localStorage.getItem('userID');
 let token = localStorage.getItem('token');

 // Das FormData Object ist dazu da die User ID, welche wir direkt oberhalb in die userID Variable (grau, nicht grün) gespeichert haben, zu verpacken
 // und unterhalb im body mitzugeben zur Authorisierung 
 let formData = new FormData();
 formData.append("userID", userID);

 // Der Authorization header enthält die verschlüsselte userID und token
 fetch("https://473535-3.web.fhgr.ch/php/holeParkplatz.php",
     {
         body: formData,
         method: "post",
         headers:{
                 'Authorization': 'Basic ' + btoa(userID + ':' + token),
                 }
     })

     .then((res) => {

         // fals die Sitzung noch aktuell ist, erhalten wir eine Zahl zwischen 200-300 zurück (bestätigung, dass die Sitzung noch nicht abgelaufen ist)
         // Dann wird die JSON antwort verarbeitet
         if (res.status >= 200 && res.status < 300) {

             return res.json();
            //  return res.text();

         } else {

             alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
             window.location = "/Login.html"

         }
    
     })

     .then((var_data) => {

         console.log('data parkplatz fetch',var_data);

        ParkplatzAnzeigen_function(var_data);
     })


}

function ParkplatzAnzeigen_function(var_data) {

    var_data.forEach(parkplatz => {


        // Wir erstellen von einem Container im HTML und füllen diesen
        // Sobald die Elemente aus der Datenbank geholt und eingefügt wurde, wird das Element der parkplatz liste hinzugefügt.
        let ParkplatzContainer = document.createElement("div");
        ParkplatzContainer.innerHTML =

            '<div class="parkplatz">' +
            '<img class="parkplatz-image" src="' + parkplatz.bild + '">' +
            '<p class="parkplatzBeschreib">' + parkplatz.beschreibung + '</p>' +
            '<a target="_blank" class="parkplatzMaps" href="https://www.google.com/maps/search/?api=1&query=' + parkplatz.adresse + '">' + parkplatz.adresse + '</a>' +
            '<a target="_blank" href="mailto:' + parkplatz.email + '">' + '<button class="parkplatzEmail"> Anfrage stellen </button>' + '</a>' +
            '<h2 class="ParkplatzFiltern hidden">' + parkplatz.status + '</h2>' +
            '<p> <b> <span id="ParkplatzID' + parkplatz.ID + '">  </span> <b> </p>'
            + '</div>';

        document.getElementById("liste-parkplatz").appendChild(ParkplatzContainer);

    });
}



// Diese Funktionen werden mit dem Klick auf den Button "Nur verfügbare anzeigen" ausgelöst
function holeParkplatzFuerFiltern_function()
{
 // Wir holen die userID und den token, welche zuvor beim Login im Localstorage gespeichert wurde
 let userID = localStorage.getItem('userID');
 let token = localStorage.getItem('token');

 // Das FormData Object ist dazu da die User ID, welche wir direkt oberhalb in die userID Variable (grau, nicht grün) gespeichert haben, zu verpacken
 // und unterhalb im body mitzugeben zur Authorisierung 
 let formData = new FormData();
 formData.append("userID", userID);

 // Der Authorization header enthält die verschlüsselte userID und token
 fetch("https://473535-3.web.fhgr.ch/php/holeParkplatz.php",
     {
         body: formData,
         method: "post",
         headers:{
                 'Authorization': 'Basic ' + btoa(userID + ':' + token),
                 }
     })

     .then((res) => {

         // fals die Sitzung noch aktuell ist, erhalten wir eine Zahl zwischen 200-300 zurück (bestätigung, dass die Sitzung noch nicht abgelaufen ist)
         // Dann wird die JSON antwort verarbeitet
         if (res.status >= 200 && res.status < 300) {

             return res.json();
            //  return res.text();

         } else {

             alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
             window.location = "/Login.html"

         }
    
     })

     .then((var_data) => {

         console.log('data parkplatz fetch',var_data);

        ParkplatzFiltern_function(var_data);
     })


}

function ParkplatzFiltern_function(var_data) {

    document.querySelector('#button-ParkplatzFiltern').classList.add("hidden");
    document.querySelector('#button-AlleParkplaetze').classList.remove("hidden");

    document.getElementById("liste-parkplatz").innerHTML = "";
    

    var_data.forEach(parkplatz => {

        if (parseInt(parkplatz.status)) {

            console.log("if wird wird aufgerufen");
            // Wir erstellen von einem Container im HTML und füllen diesen
            // Sobald die Elemente aus der Datenbank geholt und eingefügt wurde, wird das Element der parkplatz liste hinzugefügt.
            let ParkplatzContainer = document.createElement("div");
            ParkplatzContainer.innerHTML =

                '<div class="parkplatz">' +
                '<h2 class="ParkplatzFiltern hidden">' + parkplatz.status + '</h2>' +
                '<img class="parkplatz-image" src="' + parkplatz.bild + '">' +
                '<p class="parkplatzBeschreib">' + parkplatz.beschreibung + '</p>' +
                '<a target="_blank" class="parkplatzMaps" href="https://www.google.com/maps/search/?api=1&query=' + parkplatz.adresse + '">' + parkplatz.adresse + '</a> <br>' +
                '<a target="_blank" href="mailto:' + parkplatz.email + '">' + '<button class="parkplatzEmail"> Anfrage stellen </button>' + '</a>' +
                '<p> <b> <span id="ParkplatzID' + parkplatz.ID + '">  </span> <b> </p>'
                + '</div>';

            document.getElementById("liste-parkplatz").appendChild(ParkplatzContainer);
                    

        } else {

         

        }


        

    });
}



// Diese Funktionen werden mit dem Klick auf den Button "Alle Parkplätze anzeigen" ausgelöst
function holeAlleParkplaetze_function()
{
 // Wir holen die userID und den token, welche zuvor beim Login im Localstorage gespeichert wurde
 let userID = localStorage.getItem('userID');
 let token = localStorage.getItem('token');

 // Das FormData Object ist dazu da die User ID, welche wir direkt oberhalb in die userID Variable (grau, nicht grün) gespeichert haben, zu verpacken
 // und unterhalb im body mitzugeben zur Authorisierung 
 let formData = new FormData();
 formData.append("userID", userID);

 // Der Authorization header enthält die verschlüsselte userID und token
 fetch("https://473535-3.web.fhgr.ch/php/holeParkplatz.php",
     {
         body: formData,
         method: "post",
         headers:{
                 'Authorization': 'Basic ' + btoa(userID + ':' + token),
                 }
     })

     .then((res) => {

         // fals die Sitzung noch aktuell ist, erhalten wir eine Zahl zwischen 200-300 zurück (bestätigung, dass die Sitzung noch nicht abgelaufen ist)
         // Dann wird die JSON antwort verarbeitet
         if (res.status >= 200 && res.status < 300) {

             return res.json();
            //  return res.text();

         } else {

             alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
             window.location = "/Login.html"

         }
    
     })

     .then((var_data) => {

         console.log('data parkplatz fetch',var_data);

         AlleParkplaetzeAnzeigen_function(var_data);
     })


}

function AlleParkplaetzeAnzeigen_function(var_data) {

    document.querySelector('#button-ParkplatzFiltern').classList.remove("hidden");
    document.querySelector('#button-AlleParkplaetze').classList.add("hidden");

    document.getElementById("liste-parkplatz").innerHTML = "";


    var_data.forEach(parkplatz => {

        // Wir erstellen von einem Container im HTML und füllen diesen
        // Sobald die Elemente aus der Datenbank geholt und eingefügt wurde, wird das Element der parkplatz liste hinzugefügt.
        let ParkplatzContainer = document.createElement("div");
        ParkplatzContainer.innerHTML =

            '<div class="parkplatz">' +
            '<h2 class="ParkplatzFiltern hidden">' + parkplatz.status + '</h2>' +
            '<img class="parkplatz-image" src="' + parkplatz.bild + '">' +
            '<p class="parkplatzBeschreib">' + parkplatz.beschreibung + '</p>' +
            '<a target="_blank" class="parkplatzMaps" href="https://www.google.com/maps/search/?api=1&query=' + parkplatz.adresse + '">' + parkplatz.adresse + '</a> <br>' +
            '<a target="_blank" href="mailto:' + parkplatz.email + '">' + '<button class="parkplatzEmail"> Anfrage stellen </button>' + '</a>' +
            '<p> <b> <span id="ParkplatzID' + parkplatz.ID + '">  </span> <b> </p>'
            + '</div>';

        document.getElementById("liste-parkplatz").appendChild(ParkplatzContainer);

    });
}




function logout(){

    localStorage.clear();
    window.location = "/Login.html";

}


