<?php
include_once("dbh/dbh.php");
$dbh = connectToDatabase();

switch ($_SERVER['REQUEST_METHOD']) {
    /*
     * Logs the current user out.
     * @author Robert Boudewijn
     * @date 2020-01-17
     */
    case('DELETE'):
        session_destroy();
        http_response_code(200); // OK
        break;


    /*
     * Checks if the recieved user exists and if so starts a logged in session.
     * @author Robert Boudewijn
     * @date 2020-01-17
     * @param {String} username
     * @param {String} password
     * Method POST
     */
    case("POST"):
        if (isset($_POST['username'])) {
            if (strlen($_POST['password']) >= 8) {
                try {
                    $username = test_input($_POST['username']);
                    $password = hash("sha3-512", test_input($_POST['password']));

                    $serverPassword = null;
                    $serverId = null;
                    $serverAdminRights = null;
                    $sth = $dbh->prepare("SELECT password, id, adminRights from users where username = :username");
                    $sth->bindParam(':username', $username);
                    $sth->execute();
                    foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
                        $serverPassword = $row['password'];
                        $serverId = $row['id'];
                        $serverAdminRights = $row['adminRights'];
                    }
                    if ($password === $serverPassword) {
                        echo($username);
                        $_SESSION['user'] = $username;
                        $_SESSION['id'] = $serverId;
                        if ($serverAdminRights === '1') {
                            $_SESSION['adminRights'] = true;
                        } else {
                            $_SESSION['adminRights'] = false;
                        }
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
        break;

    /*
    * Checks if the user is all ready logged in
    * @author Robert Boudewijn
    * @date 2020-01-17
    * @param {String} username
    * Method GET
    */
    case("GET"):
        if (isset($_SESSION['user'])) {
            echo("{\"login\":true}");
            http_response_code(200); // OK
        } else {
            echo("{\"login\":false}");
            http_response_code(401); //Not authenticated
        }
        break;
}



