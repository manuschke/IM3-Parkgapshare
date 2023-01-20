<?php

// Dieses File bekommt die Anfrage von parkplatz.js und fragt diese beim Server ab


require('config.php');
require('autorisieren.php');


$userID =  $_POST["user_ID"];
$adresse = $_POST["adresse"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];
$beschreibung = $_POST["beschreibung"];
$bild = $_POST["bild"];


$sql = "INSERT INTO parkplatz (user_ID, adresse, stadt, status, beschreibung, bild) VALUES (:User, :Adresse, :Stadt, :Status, :Beschreibung, :Bild)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('User' => $userID, 'Adresse' => $adresse, 'Stadt' => $stadt, 'Status' => $status, 'Beschreibung' => $beschreibung, 'Bild' => $bild));

if ($erfolg) {

    print_r('Parkplatz erfolgreich erstellt!');

} else {

    print_r($erfolg);
  
};