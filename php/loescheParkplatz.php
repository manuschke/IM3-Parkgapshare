<?php

require_once('config.php');
require_once('autorisieren.php');

$user_ID = $_POST["user_ID"];
$parkplatzID = $_POST["parkplatzID"];

$sql = "DELETE FROM parkplatz WHERE user_ID = ? AND ID = ?";
$stmt = $pdo->prepare($sql);


$erfolg = $stmt->execute([$user_ID, $parkplatzID]);

if ($erfolg) {

    print_r("Dein Parkplatz wurde erfolgreich gelöscht.");

} else {

    print_r($erfolg);

} 