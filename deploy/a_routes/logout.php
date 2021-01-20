<?php
/*
 * Logs the current user out.
 * @author Robert Boudewijn
 * @date 2020-01-17
 */
include_once("dbh/dbh.php");
session_destroy();
http_response_code(200); // OK
