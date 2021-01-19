<?php
/*
 * Logs the current user out.
 */
include_once("dbh/dbh.php");
session_destroy();
http_response_code(200); // OK
