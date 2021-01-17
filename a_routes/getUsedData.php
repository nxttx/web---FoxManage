<?php
/*
 * Checks the used capacity of the user.
 * @return {Object}
 */
include_once("dbh/dbh.php");
$dbh = connectToDatabase();
function folderSize($dir)
{
    $size = 0;

    foreach (glob(rtrim($dir, '/') . '/*', GLOB_NOSORT) as $each) {
        $size += is_file($each) ? filesize($each) : folderSize($each);
    }

    return $size;
}

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

        $usedDirSize = round($usedDirSize / 1048576, 2);
        $return = array("maxDirSize" => (float)$maxDirSize, "usedDirSize" => $usedDirSize);
        echo(json_encode($return));
        http_response_code(200); //OK
    } catch (exception $e) {
        http_response_code(500); //Bad Request
        echo($e);
    }
} else {
    http_response_code(400); //Bad Request
}