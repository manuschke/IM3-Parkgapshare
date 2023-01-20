<?php

require_once('config.php');
require_once('autorisieren.php');

$user_ID = $_POST["user_ID"];
$adresse = $_POST["adresse"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];
$beschreibung = $_POST["beschreibung"];
$bild = $_POST["bild"];
$parkplatzID = $_POST["parkplatzID"];

$sql = "UPDATE parkplatz SET adresse=?, stadt=?, status=?, beschreibung=?, bild=? WHERE user_ID=?";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$adresse, $stadt, $status, $beschreibung, $bild, $user_ID]);


if ($erfolg) {

    print_r('Dein Parkplatz wurde erfolgreich aktualisiert!');

} else {

    print_r($erfolg);
  
};

