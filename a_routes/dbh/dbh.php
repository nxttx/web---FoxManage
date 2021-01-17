<?php
session_start();
function connectToDatabase(){
    $upload = false;
    if ($upload) {
        include_once("passwords.php");
    } else {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "reseller";
    }

    try {
        $dbh = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $sth = $dbh->prepare("SET NAMES utf8");
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $row = null;
        }
    } catch (PDOException $e) {
    }
    return ($dbh);
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

