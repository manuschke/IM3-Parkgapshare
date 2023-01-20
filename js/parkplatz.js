var parkplatzID;


holeUserParkplatz();


// Diese Funktion wird durch das Drücke auf den "Veröffentlichen" Button ausgelöst
// Sie holt sich die eingetragenen Daten aus dem HTML und speichert diese über das neueParkplatz.php in die Datenbank
function neuerParkplatz_function(){

    let adresse = document.querySelector("#adresse").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let bild = document.querySelector("#bild").value;
    let stadt = document.querySelector("#stadt").value;
    let status = document.querySelector("input[name='status']:checked").value;


    let formData = new FormData();
    var user_ID = localStorage.getItem('userID');
    formData.append('user_ID', user_ID);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('bild', bild);
    formData.append('stadt', stadt);
    formData.append('status', status);

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');


    fetch("https://473535-3.web.fhgr.ch/php/neueParkplatz.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((var_data) => {

        console.log(var_data);
        document.querySelector('#nachricht').innerHTML = var_data;

        })

}


// Bei dieser Funktion wird geprüft ob der eingelogte user bereits einen Parkplatz erstellt hat oder nicht
// Hat er bereits einen erstellt, wird das Parkplatz-erstellen-Formular mit den Datenbank Daten ausgefüllt
function holeUserParkplatz() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    var user_ID = localStorage.getItem('userID');
    formData.append('user_ID', user_ID);

    fetch("https://473535-3.web.fhgr.ch/php/holeUserParkplatz.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })



        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/Login.html"

            }

        })

        // falls es noch keinen Parkplatz von diesem User gibt, wird ein infotext angezeigt und der "Veröffentlichen" button wird eingeblendet (unhidden)
        // falls es bereits einen Parkplatz von diesem User gibt, wird die prakplatzID (ID in der Parkplatz Tabelle auf dem Server) als globale Variable gespeichert
        // Die Daten erhalten wir vom holeUserParkplatz.php. Wir erhalten alle Parkplatz Daten zu der entsprechenden User ID aus dem Lokal Storage
        // Die globale Variable wird benötigt, um den Parkplatz zu aktualisieren oder zu löschen
        .then((var_data) => {
        
            if (var_data.length == 0) {

                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deinen Parkplatz aufzuschalten:"

                document.querySelector('#button-neue').classList.remove("hidden");

            } else {

                parkplatzID = var_data[0].ID;

                document.querySelector('#infoText').innerHTML = "Hier kannst du die Daten von deinem Parkplatz bearbeiten:"

                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // Die, in der Variable var_data, erhaltenen Daten werden ausgelesen und über den querySelector ins HTML geschrieben.
                document.querySelector('#adresse').value = var_data[0].adresse;
                document.querySelector('#beschreibung').value = var_data[0].beschreibung;
                document.querySelector('#bild').value = var_data[0].bild;
                document.querySelector('#stadt').value = var_data[0].stadt;

                // setze den korrekten Status (Radiobutton) aus den Infos der DB
                if (var_data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }


            }
        })
}


// Der User hat nun die neun Daten für den Parkplatz aktualisieren können
// Bei dieser Funktion werden die Werte aus den Feldern ausgelesen und über das aktualisiereParkplatz.php in die entsprechenden Spalten in der Datenbank geschrieben
// mit dem "document.querySelector('#nachricht').innerHTML = var_data;" wird dem User die im aktualisiereParkplatz.php definierte Nachricht angezeigt
function aktualisiereParkplatz() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');
    

    let adresse = document.querySelector("#adresse").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let bild = document.querySelector("#bild").value;
    let stadt = document.querySelector("#stadt").value;
    let status = document.querySelector("input[name='status']:checked").value;


    let formData = new FormData();
    var user_ID = localStorage.getItem('userID');
    formData.append('user_ID', user_ID);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('bild', bild);
    formData.append('stadt', stadt);
    formData.append('status', status);


    formData.append('parkplatzID', parkplatzID);


    fetch("https://473535-3.web.fhgr.ch/php/aktualisiereParkplatz.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/Login.html"

            }

        })
        .then((var_data) => {

            document.querySelector('#nachricht').innerHTML = var_data;

        })
}


function loescheParkplatz() {

    
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    let user_ID = localStorage.getItem('userID');
    formData.append('user_ID', user_ID);
    formData.append('parkplatzID', parkplatzID);

    fetch("https://473535-3.web.fhgr.ch/php/loescheParkplatz.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/Login.html"

            }

        })
        .then((var_data) => {
            
            document.querySelector('#nachricht').innerHTML = var_data;

            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#stadt').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;
            
            parkplatzID = "";

        })
};


function userloeschen() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://473535-3.web.fhgr.ch/php/loescheUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/Login.html"

            }

        })

        logout();
};


function logout(){

    localStorage.clear();
    window.location = "/Login.html";

}