




function login_function()
{

// Erklärung
    // wir holen mit dem querySelector den Benutzernamen, die Mail und das Passwort aus dem Eingabefeld des HTMLs
    let var_mail_js = document.querySelector("#id_mail_html").value;
    let var_password_js = document.querySelector("#id_password_html").value;

    console.log(var_mail_js + var_password_js);

    
// Erklärung
    //das FormData Object ist dazu da die Userinformationen von unserem Formular für das weiterschicken aufzubereiten.
    let var_formData = new FormData();
    var_formData.append('FormDataKey_mail_js', var_mail_js);
    var_formData.append('FormDataKey_password_js', var_password_js);

// Erklärung
    // Die FormData Daten werden mit der Fetch Funktion über unser login.php an den Server übermittelt
    fetch("https://473535-3.web.fhgr.ch/php/login.php",
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

            return var_response.json();
// Erklärung
    // Wir schreiben die geholten Daten ins HTML 
        })
        .then((var_data) => {

            console.log(var_data);
            document.querySelector('#id_nachricht_html').innerHTML = var_data[0];

            // Erklärung
                // Die Daten die mittels der "sendeAntwort_function" Funktion im PHP ausgegeben werden, durchstöbern wir hier auf den zweiten und dritten platz, also unsere UserID und Token
                // Diese Daten schreiben wir dann ins localStorage unter den Key's UserID und token
            localStorage.setItem("userID", var_data[1]);
            localStorage.setItem("token", var_data[2]);

            // Erklärung
                // Im Login.PHP haben wir die Funktion "sendeAntwort_function("Session erstellt", $userID, $token);"
                // Gibt es ein Problem beim Login, wie zb ein falsches Passwort Sieht die Funktion so aus: "sendeAntwort_function("ungültiges Passwort", 0, 0);"
                // bei der untenstehenden if() bedingung wird geschaut ob die letzten bein Werte der "sendeAntwort_function" Funktion nicht 0 sind, also ID oder Token enthalten
                // trifft dies zu wird man auf die Startseite weitergeleitet. wird ein null an einem oder beiden der token und ID stelle gefunden, wird die Weiterleitung nicht ausgeführt
            if (var_data[1]!=0 && var_data[2]!=0) {

                window.location.href = "https://473535-3.web.fhgr.ch/";

            }

        })
        

}