<?php
/*
 *  Gets all the domains of the user
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @return {array} domains of user
 */
include_once("dbh/dbh.php");
$dbh = connectToDatabase();

if (isset($_SESSION['user'])) {
    try {
        //get all domains:
        $domains = array();
        $sth = $dbh->prepare("SELECT databaseName from userdatabases where user = :id");
        $sth->bindParam(':id', $_SESSION['id']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            array_push($domains, $row['databaseName']);
        }

        echo(json_encode($domains));
        http_response_code(200); //OK
    } catch (exception $e) {
        http_response_code(500); //Server error
        echo($e);
    }
} else {
    http_response_code(401); //not authenticated
}