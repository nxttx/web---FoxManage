<?php
/*
 * Checks if the recieved user exists and if so starts a logged in session.
 * @param {String} username
 * @param {String} password
 */
include_once("dbh/dbh.php");
$dbh = connectToDatabase();
if (isset($_POST['username'])) {
    if (strlen($_POST['password']) >= 8) {
        try {
            $username = test_input($_POST['username']);
            $password = hash("sha3-512", test_input($_POST['password']));

            $serverPassword = null;
            $serverId = null;
            $sth = $dbh->prepare("SELECT password, id from users where username = :username");
            $sth->bindParam(':username', $username);
            $sth->execute();
            foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
                $serverPassword = $row['password'];
                $serverId = $row['id'];
            }
            if ($password === $serverPassword) {
                $_SESSION['user'] = $username;
                $_SESSION['id'] = $serverId;
                http_response_code(200); // OK
            } else {
                http_response_code(400); //Bad Request
            }
        } catch (exception $e) {
            http_response_code(500); //Bad Request
        }
    } else {
        http_response_code(400); //Bad Request
    }
} else {
    http_response_code(400); //Bad Request
}