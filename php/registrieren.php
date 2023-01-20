<?php

// Erklärung 
    // Das config.php wird eingebunden, wird benötigt für die pdo Variable 
require("config.php");

// Erklärung 
    // userdaten welche beim Registrieren angegeben worden sind, werden abgerufen. 
    // $_Post ist hier keine Variable sondern die Methode der Übermittlung.
$email = $_POST["FormDataKey_mail_js"];
$username = $_POST["FormDataKey_benutzername_js"];
$password = $_POST["FormDataKey_password_js"];
$autonummer = $_POST["FormDataKey_autonummer_js"];


    
// Erklärung 
    // Nachdem das Passwort abgerufen wurde (oberhalb), wird es hier ge-Hased, also encrypted.
$password = password_hash($password, PASSWORD_DEFAULT); 
    
// Erklärung 
    // SQL Statement mit was wir in die Datenbank eingeben wollen
    // Erste klammer sind die Namen der Tabellenspalten, die zweite Klammer sind Platzhalter für die Variablen, also Userdaten.
    // into User -> User Tabellen auf dem Server
    // Values -> Namen unserer Platzhalter
$sql = "INSERT INTO user (name, email, password, autonummer) VALUES (:Name, :Email, :Password, :Autonummer)";

// Erklärung 
    // Datenbankverbindung wird mit der PDO Varibale, welche im config.php definiert wurde, erstellt.
$stmt = $pdo->prepare($sql);

// Erklärung 
    // Wir definieren was wir ausführen wollen. Die echten Variablen werden durch die Platzhalter in die Spalten eingefügt.
$erfolg = $stmt->execute(array('Name' => $username, 'Email' => $email, 'Password' => $password, 'Autonummer' => $autonummer));

// Erklärung
    // Wenn alles klappt wird die Variable $erfolg true. 
    // if ($erfolg) ist das gleiche wie if ($erfolg ==1)
    // dann wird der Text 'Registrierung erfolgreich.' ausgegeben.
    // falls es nicht erfolgreich war wird die fehlermeldung ausgegeben
if ($erfolg) {

    print_r('Registrierung erfolgreich.');
        
     } else {

    print_r($erfolg);

};



?>