<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE");
session_start();


/*
*  Function makes a connection to the database.
*  @author Robert Boudewijn
*  @date 2020-01-17
*/ 
function connectToDatabase(){
    $state = "local"; // "local", "test", "online"
    if ($state == "online") {
        include_once("passwords.php");
        
    } elseif($state == "local") {
        $servername = "localhost";
        $username = "root"; 
        $password = "";
        $dbname = "FoxManage";

        //for react development
        $_SESSION['user'] = 'RobertBoudewijn';
        $_SESSION['id'] = 1;
        $_SESSION['adminRights'] = true;

    }elseif ($state === "test"){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "TEST_FoxManage";
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
*  Function makes a connection to the database server.
*  @author Robert Boudewijn
*  @date 2020-01-17
*/
function connectToMasterDatabase(){
    $state = "local"; // "local", "online"
    if ($state == "online") {
        include_once("passwords.php");

    } elseif($state == "local") {
        $servername = "localhost";
        $username = "root";
        $password = "";
    }

    try {
        $dbh = new PDO("mysql:host=$servername", $username, $password);
        $sth = $dbh->prepare("SET NAMES utf8");
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $row = null;
        }
    } catch (PDOException $e) {
    }
    return ($dbh);
}

function SQLDump(){
    $DBUSER="user";
    $DBPASSWD="password";
    $DATABASE="user_db";
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "FoxManage";

    $filename = "backup-" . date("d-m-Y") . ".sql.gz";
    $mime = "application/x-gzip";

    header( "Content-Type: " . $mime );
    header( 'Content-Disposition: attachment; filename="' . $filename . '"' );

    $cmd = "mysqldump -u $username --password=$password --host=$servername $dbname | gzip --best";

    passthru( $cmd );
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

/*
*  Checks if the string has sql inside.
*  @author Robert Boudewijn
*  @date 2020-01-17
*  @param {String}
*/
function containsSQL($data){
    $data = strtolower($data);
    if(
        strpos($data, ';') ||
        strpos($data, 'select') ||
        strpos($data, 'drop') ||
        strpos($data, 'alter') ||
        strpos($data, 'delete') ||
        strpos($data, 'update') ||
        strpos($data, 'create')
    ) {
    return true;
    }
}

