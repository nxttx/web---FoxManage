<?php
/*
 * Checks if the user is all ready logged in
 * @author Robert Boudewijn
 * @date 2020-01-17
 * @param {String} username
 */
include_once("dbh/dbh.php");
$dbh = connectToDatabase();
if (isset($_SESSION['user'])) {
    http_response_code(200); // OK
} else {
    http_response_code(401); //Not authenticated
}
echo("{}");