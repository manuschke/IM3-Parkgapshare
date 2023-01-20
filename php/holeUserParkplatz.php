<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["user_ID"];

$sql = "SELECT * FROM parkplatz WHERE user_ID = $userID";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}