<?php
header("Access-Control-Allow-Origin: *");
session_start();
//for react development
//$_SESSION['user'] = 'RobertBoudewijn';
//$_SESSION['id'] = 1 ;
//$_SESSION['adminRights'] = true;
/*
*  Function makes a connection to the database.
*  @author Robert Boudewijn
*  @date 2020-01-17
*/ 
function connectToDatabase(){
    $upload = true;
    if ($upload) {
        include_once("passwords.php");
    } else {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "FoxManage";
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

/*
*  formates all data so it doesnt have any special chars 
*  @author Robert Boudewijn
*  @date 2020-01-17
*  @param {String} 
*/ 
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

