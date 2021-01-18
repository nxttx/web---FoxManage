<?php
/*
 *  Checks the used capacity of the user.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @return {Object} {usedDirSize, maxDirSize, folderUsedDirSize}
 */
include_once("dbh/dbh.php");
$dbh = connectToDatabase();

if (isset($_SESSION['user'])) {
    try {
        $maxDirSize = null;
        $usedDirSize = 0;
        //get maxDirSize
        $sth = $dbh->prepare("SELECT maxDirSize from users where username = :username");
        $sth->bindParam(':username', $_SESSION['user']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $maxDirSize = $row['maxDirSize'];
        }
        //get all domains:
        $sth = $dbh->prepare("SELECT domainName from domains where user = :id");
        $sth->bindParam(':id', $_SESSION['id']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $f = 'C:/XAMPP/Domains/' . $row['domainName'];
            $obj = new COM ('scripting.filesystemobject');
            if (is_object($obj)) {
                $ref = $obj->getfolder($f);
                $usedDirSize += $ref->size;
                $obj = null;
            } else {
                echo 'can not create object';
            }
        }
        // make bytes in to mb
        $usedDirSize = round($usedDirSize / 1048576, 2);
        $folderUsedDirSize =$usedDirSize;
        //get all databases
        $sth = $dbh->prepare("SELECT databaseName from userdatabases where user = :id");
        $sth->bindParam(':id', $_SESSION['id']);
        $sth->execute();
        foreach ($sth->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $sth2 = $dbh->prepare('SELECT table_schema,
                                                    ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "SizeInMB" 
                                            FROM information_schema.tables 
                                            WHERE table_schema = :databaseName
                                            GROUP BY table_schema');
            $sth2->bindParam(':databaseName', $row["databaseName"]);
            $sth2->execute();
            foreach ($sth2->fetchAll(PDO::FETCH_ASSOC) as $row2) {
                $usedDirSize += $row2['SizeInMB'];
            }
        }


        $return = array("maxDirSize" => (float)$maxDirSize, "usedDirSize" => $usedDirSize, "folderUsedDirSize" => $folderUsedDirSize);
        echo(json_encode($return));
        http_response_code(200); //OK
    } catch (exception $e) {
        http_response_code(500); //Server error
        echo($e);
    }
} else {
    http_response_code(401); //not authenticated
}