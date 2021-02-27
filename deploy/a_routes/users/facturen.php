<?php
include_once("../dbh/dbh.php");
$dbh = connectToDatabase();

/*
 *  Gets all the domains of the user
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @return {array} domains of user
 *  Method GET
 */
if (isset($_SESSION['user'])) {
    try {
        //get all facturen:
        $facturen = array();
        $sth = $dbh->prepare("SELECT f.id, f.date, f.payed, f.IDEAL, u.adress, u.number, u.zipcode, u.city, u.country, u.firstname, u.lastname from facturen f JOIN usersadress u on f.user=u.id where f.user = :id ");
        $sth->bindParam(':id', $_SESSION['id']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $producten = array();
            $sth1 = $dbh->prepare("SELECT * from factuurproducten where factuurnummer = :id");
            $sth1->bindParam(':id', $row['id']);
            $sth1->execute();
            foreach ($sth1->fetchAll(PDO::FETCH_ASSOC) as $entry) {
                $product = array("productname" => $entry['productname'], "amount" => $entry['amount'], "price" => $entry["price"]);
                array_push($producten, $product);
            }
            $user = array("firstName" =>$row['firstname'],"lastName"=>$row["lastname"],"adress" => $row['adress'],"number"=>$row["number"], "zipcode" => $row['zipcode'], "city" =>$row["city"], "country"=> $row["country"]);
            $factuur = array("userinfo" => $user, "id" => $row['id'], "date" => $row["date"], "payed" => $row["payed"], "products" => $producten, "IDEAl" =>$row['IDEAL']);
            array_push($facturen, $factuur);
        }

        echo(json_encode($facturen));
        http_response_code(200); //OK
    } catch (exception $e) {
        echo($e);
        http_response_code(500); //Server error

    }
} else {
    echo("{\"login\":false}");
    http_response_code(401); //not authenticated
}