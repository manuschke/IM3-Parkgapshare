<?php

require("config.php");
require("autorisieren.php");

// Aus den Tabellen Parkplatz und User werden die entsprechenden Spalten geholt
// Mit "parkplatz P" weisen wir dem Buchstaben P die Tabelle parkplatz zu (gleich für user und stadt)
// mit dem "ON" Befehl wird der erste Wert beim Ort des zweiten Werts eingefügt resp. angezeigt (es werden keine Kerndaten überschrieben)
$sql = "SELECT P.ID, P.adresse, P.stadt, P.bild, P.beschreibung, P.status, U.name, U.email 
FROM parkplatz P
INNER JOIN user U
ON P.user_ID = U.ID
INNER JOIN stadt ST
ON P.stadt = ST.ID";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}