<?php
include_once("../dbh/dbh.php");
$dbh = connectToDatabase();

/*
 *  Gets all the mailboxes of the user
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @return {array} mailboxes of user
 *  Method GET
 */
if (isset($_SESSION['user'])) {
    try {
        //get all domains:
        $domains = array();
        $sth = $dbh->prepare("SELECT domainName from domains where user = :id");
        $sth->bindParam(':id', $_SESSION['id']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            array_push($domains, $row['domainName']);
        }

        echo(json_encode($domains));
        http_response_code(200); //OK
    } catch (exception $e) {
        echo($e);
        http_response_code(500); //Server error
    }
} else {
    echo("{\"login\":false}");
    http_response_code(401); //not authenticated
}