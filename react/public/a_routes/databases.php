<?php
include_once("dbh/dbh.php");
$dbh = connectToDatabase();

if (!isset($_SESSION['user'])) {
    echo("{\"login\":false}");
    http_response_code(401); //Not authenticated
    return;
}

switch ($_SERVER['REQUEST_METHOD']) {
    /*
     * deletes database
     * @author Robert Boudewijn
     * @date 2021-06-21
     * @param {String} name
     * Method delete
     */
    case('DELETE'):
        if (isset($_GET['name'])) {
            if(containsSQL($_GET["name"]) || (strpos($_GET["name"], $_SESSION["user"]) === false)){
                http_response_code(401); //unauthorized
                break;
            }

            $name = test_input($_GET["name"]);

            try {
                $mdbh = connectToMasterDatabase();
                $mdbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sql = "DROP DATABASE " . $name;
                $mdbh->exec($sql);
            } catch (exception $e) {
                http_response_code(500); //internal error
                break;
            }
            http_response_code(200); //OK
            echo($name);
            break;
        } else {
            http_response_code(400); //Bad Request
            break;
        }
        break;


    /*
     * add's new database
     * @author Robert Boudewijn
     * @date 2021-06-21
     * @param {String} name
     * Method POST
     */
    case("POST"):
        if (isset($_GET['name'])) {
            if(containsSQL($_GET["name"])){
                http_response_code(400); //Bad Request
                break;
            }


            $name = test_input($_GET["name"]);
            $name = $_SESSION["user"] ."_". $name;

            try {
                $mdbh = connectToMasterDatabase();
                $mdbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $sql = "CREATE DATABASE " . $name;
                $mdbh->exec($sql);

                $sth = $dbh->prepare("INSERT INTO userdatabases(user, databasename) VALUES ( :user, :databaseName)");
                $sth->bindParam(':user', $_SESSION['id']);
                $sth->bindParam(':databaseName', $name);
                $sth->execute();
            } catch (exception $e) {
                http_response_code(500); //internal error
                break;
            }
            echo($name);
            http_response_code(201); //created
            break;
        } else {
            http_response_code(400); //Bad Request
            break;
        }

        break;

    /*
    * gets all databases or a sql dump of a database
    * @author Robert Boudewijn
    * @date 2021-06-21
    * @param {String} name
    * Method GET
    */
    case("GET"):
        break;

    /*
    * copies the database with a new name
    * @author Robert Boudewijn
    * @date 2021-06-21
    * @param {String} name
    * @param {String} newName
    * Method GET
    */
    case("PUT"):
        if (isset($_SESSION['user'])) {
            echo("{\"login\":true}");
            http_response_code(200); // OK
        } else {
            echo("{\"login\":false}");
            http_response_code(401); //Not authenticated
        }
        break;
}



