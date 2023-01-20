<?php

// Erklärung 
    // Das config.php wird eingebunden. wird benötigt für die pdo Variable.
require("config.php");


// Login
// Login
// Login
// Login


// Eingetragene Userdaten werden geholt
// Erklärung 
    // userdaten welche beim Login angegeben worden sind, werden abgerufen. 
    // $_Post ist hier keine Variable sondern die Methode der Übermittlung.
$email = $_POST["FormDataKey_mail_js"];
$password = $_POST["FormDataKey_password_js"];





// Eingegebene Mail wird in der Serverdatenbank gesucht
// Erklärung
    // Wir suchen auf dem Server nach der Datenbank "user" und speziefisch nach dem User mit der eingegeben email.
    // Das Passwort wird also auch mit selected, es wird einfach nicht nach dem Passwort geprüft. Die Kriterien der Suche beschränken sich also nur auf die email.
    // Es ist wichtig hier die einelnen Anführungszeichen für die Variablen zu nutzen. also so '$...' und nicht so "$...",
    // $sql bis $erfolg ist die PDO connection
$sql = "SELECT * FROM user WHERE email = '$email'";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();





// Bei einem Match mit einer Mail in der Datenbank werden alle User Daten der Mail abgefragt 
// Erklärung
    // Bei einem erfolgreichen Match werden alle dieser Daten aus der Datenbank ausgelesen und in der Variablen $array gespeichert.
    // Anschliessend wird die Variable $Anzahl_Resultate bestimmt, welche die Anzahl an Matches zählt.
    // gibt es mehr oder weniger als einen Match wird die Fehlermeldung "Dieser User existiert nicht." angezeigt.

if ($erfolg)
{

    $array = $stmt->fetchAll();

    $Anzahl_Resultate = count($array);

   
    if ($Anzahl_Resultate == 1){

        // Wir geben den entsprechenden Variablen das "Passwort" und die "ID" übereinstimmenden Mailadresse aus dem Loginversuch von der Datenbank
        // Erklärung 
            // In der Variable $db_Passwort_php wird das Passwort, welcher der Server als Antwort auf das Login zurück gibt, gespeichert
            // Wir müssen definieren, dass wir gerne den ersten Eintrag des Arrays hätten
                // (es könnte theoretisch mehr als einen User mit den gleichen Daten und demnach mehr als ein Array-Element geben)
            // gleich danach definieren wir, dass wir aus dem ersten (0) Array-Element gerne die Daten mit dem Titel "Password" hätten.
            // In kurz holen wir also einfach das Passwort aus der Datenbank, wo die, im Login eingegebene, Mail mit einer Mail in der Datenbank übereinstimmt.
        $db_Passwort_php = $array[0]["password"];
        $userID = $array[0]["ID"];

        // Aufrufen von Funktion um das eingetippte Passwort mit dem, auf dem Server gespeicherte Passwort abzugleichen und eine Session für den User zu erstellen.
        // Erklärung 
                // Wir rufen die Funktion passwort_kontrolle_function auf mit den Variablen:
                // $password = eingegebenes Passwort des Users beim Login
                // $db_Passwort_php = Passwort, welches auf dem Server für die entsprechende Mail gespeichert wurde
                // $userID = Die ID, welcher der User beim erstmaligen Registrieren erhalten hat (auf dem Server in der User Tabelle zu finden)
        password_kontrolle_function($password, $db_Passwort_php, $userID);

        } else {

        sendeAntwort_function("Dieser User existiert nicht", 0, 0);

        }

}





// Erklärung 
    // Die Variablen $user_pas und $server_pas sind korrelierend zu den Variablen $password und $db_Passwort_php
    // Also $user_pas = $password und $server_pas = $db_Passwort_php
    // Wir können diese hier anderst nennen, da sie hir in der Klammer jeweils an der gleichen Stelle stehen wie beim aufrufen der Funktion 
    // DIe userID geben wir direkt weiter an die function erstelleToken
function password_kontrolle_function($user_pas, $server_pas, $userID)
{

    if (password_verify($user_pas, $server_pas)) {

        // Funtion aufrufen um Token und Session zu erstellen
        // Erklärung 
            // bei erfolgreichem einlogen wird die funktion erstelleToken aufgerufen
            // Diese erstellt einen Token und eine Session für den User
        erstelleToken($userID);

        // echo 'Email und Passwort sind Korrekt';

    } else {

        sendeAntwort_function("ungültiges Passwort", 0, 0);

    }
}




// Session erstellen
// Session erstellen
// Session erstellen
// Session erstellen


function erstelleToken($userID) 
{
    // Da wir innerhalb einer funktion sind müssen wir das config.php neu verbinden
    require("config.php");

    // Erklärung
        // Wir rufen die Funktion generiereTokenString_function auf und geben den Wert 42 mit.
        // Diese 42 wird in der generiereTokenString_function Funktion als Wert für die $length varibale genutzt
        // Die 42 gibt also vor, wie viele Zeichen der Token haben wird
    $token = generiereTokenString_function(42);
        
    // Erklärung 
        // SQL Statement mit was wir in die Datenbank eingeben wollen
        // Erste klammer sind die Namen der Tabellenspalten, die zweite Klammer sind Platzhalter für die Variablen, also Userdaten.
        // into session -> session Tabellen auf dem Server
        // Values -> Namen unserer Platzhalter
    $sql = "INSERT INTO session (user_ID, Token) VALUES (:user_ID, :Token)";

    // Erklärung 
        // Datenbankverbindung wird mit der PDO Varibale, welche im config.php definiert wurde, erstellt.
    $stmt = $pdo->prepare($sql);

    // Erklärung 
        // Wir definieren was wir ausführen wollen. Die echten Variablen werden durch die Platzhalter in die Spalten eingefügt.
    $erfolg = $stmt->execute(array('user_ID' => $userID, 'Token' => $token));


// Erklärung
    // Wenn alles klappt wird die Variable $erfolg true. 
    // if ($erfolg) ist das gleiche wie if ($erfolg ==1)
    // dann wird der Text 'Session erstellt' ausgegeben.
    // falls es nicht erfolgreich war wird die fehlermeldung ausgegeben
if ($erfolg) {

    sendeAntwort_function("Session erstellt", $userID, $token);
        
     } else {

    sendeAntwort_function("Datenbankfehler " .$erfolg, 0, 0);
    
}  
}





// Erklärung
    // Müssen wir nicht verstehen, prinzipiel geben wir beim Aufrufen dieser Funktion mittels der Variable $token die gewünschte Länge des Tokens an
    // der Rest ist einfach eine Randomization von den angegebenen Charakter aus der Variable $characters
function generiereTokenString_function($length)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}




function sendeAntwort_function($nachricht, $userID, $token)
{
    $antwort_Array = [$nachricht, $userID, $token];

    $antwort_Array = json_encode($antwort_Array);

    print($antwort_Array);
}