<?php

// Dieses File ist dazu da, die UserID und den Token, welchen wir im script.js mit dieser Anweisung verpacken ('Authorization': 'Basic ' + btoa(userID + ':' + token),)
// an den Server zu übermitteln und die Daten auszulesen.
// Schlussendlich ist dieses php file nötig um die Verschlüsselung (oben erwähnt) aus dem script.js zu entschlüsseln und zu Prüfen ob die Session existiert und noch aktuel ist.
// Mit diesem File kann jede zukünftige Aktion in anderen php oder js files autorisiert werden
// In diesem File wurden bereits 3 der 4 SQL Statements benutzt -> Select, Update & Delete
require("config.php");



// Wir rufen die lösch funktion bereits hier auf damit die alte Session zuerst gelöscht wird und erst dann eine neue erstellt wird.
loescheSessions();

// Die, im scrip.js verschlüsselte, userID und token können durch diese Befehle an den Server gesendet und ausgelesen werden
$userID = $_SERVER["PHP_AUTH_USER"];
$token = $_SERVER["PHP_AUTH_PW"];



$sql = "SELECT * FROM session WHERE user_ID = $userID AND token = '$token'
AND timestamp > (NOW() - INTERVAL 2 HOUR)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $resultate = $stmt->fetchAll();

    $sitzungsID = $resultate[0]['ID'];

    $anzahlResultate = count($resultate);

    if ($anzahlResultate == 1) {

        updateSession($sitzungsID);

    } else {

        exit(http_response_code(401));

    }
}



// Wenn der User eingeloggt ist und die Session noch aktuell ist wird diese Funktion aufgerufen um die Session zu Updaten.
// Dies passiert jedes mal wenn der User etwas macht
function updateSession($sitzungsID)
{
    require('config.php');

    $sql = "UPDATE session SET timestamp = now() WHERE ID=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$sitzungsID]);
}




// Um nicht unnötig viele Sessions auf dem Server zu speichern, wird jede Session die älter als zwei Stunden ist gelöscht
function loescheSessions()
{
    require('config.php');

    $sql = " DELETE FROM session WHERE timestamp < (NOW() - INTERVAL 2 HOUR);";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
}