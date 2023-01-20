

// Erklärung
    // Wird durch den Klick auf den Button im HTML ausgelöst
function registrieren_function()
{

// Erklärung
    // wir holen mit dem querySelector den Benutzernamen, die Mail und das Passwort aus dem Eingabefeld des HTMLs
    let var_benutzername_js = document.querySelector("#id_benutzername_html").value;
    let var_mail_js = document.querySelector("#id_mail_html").value;
    let var_password_js = document.querySelector("#id_password_html").value;
    let var_autonummer_js = document.querySelector("#id_autonummer_html").value;

// Erklärung
    //das FormData Object ist dazu da die Userinformationen von unserem Formular für das weiterschicken aufzubereiten.
    let var_formData = new FormData();
    var_formData.append('FormDataKey_benutzername_js', var_benutzername_js);
    var_formData.append('FormDataKey_mail_js', var_mail_js);
    var_formData.append('FormDataKey_password_js', var_password_js);
    var_formData.append('FormDataKey_autonummer_js', var_autonummer_js);

// Erklärung
    // Die FormData Daten werden mit der Fetch Funktion über unser registrieren.php an den Server übermittelt
    fetch("https://473535-3.web.fhgr.ch/php/registrieren.php",
        {
            body: var_formData,
            method: "post",
        })
    

// Erklärung
    // beim ersten .then schauen wir einfach, ob wir eine Antwort erhalten haben
    // beim return wollen diese in form von text vorgelegt bekommen.
    // Wenn wir mit den Daten arbeiten wollten, müssten wir anstatt .text .JSON verwenden
    // und beim zweiten .then geben wir die Daten als Text (wie zuvor definiert) in der console aus 

    .then((var_response) => {

        return var_response.text();
// Erklärung
    // Wir schreiben die geholten Daten ins HTML 
    })
    .then((var_data) => {

        document.querySelector('#id_nachricht_html').innerHTML = var_data;

    })
    
}  


