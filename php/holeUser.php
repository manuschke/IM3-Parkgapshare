<?php

// In diesem File wurde das letzte SQL Statement benutzt -> Select

require("config.php");
require("autorisieren.php");

// die FormData aus der holeUser_function Funktion vom script.js wird an dieses php File gesendet. 
// hier wird es mit $_POST an den Server geschickt und dann die Antwort im script.js ausgelesen.
$userID =  $_POST["userID"];

$sql = "SELECT name FROM user WHERE ID = $userID";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}
