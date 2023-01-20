<?php



require_once('config.php');
// require_once('autorisieren.php');



$user_ID = $_POST["userID"];


$sql = "DELETE FROM session WHERE user_ID = $user_ID";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    print_r("Deine aktuelle Session wurde gelöscht");

} else {

    print_r($erfolg);

} 

$sql_2 = "DELETE FROM user WHERE ID = $user_ID";
$stmt_2 = $pdo->prepare($sql_2);

$erfolg_2 = $stmt_2->execute();


if ($erfolg_2) {

    print_r("Dein Account wurde erfolgreich gelöscht.");

} else {

    print_r($erfolg_2);

} 
