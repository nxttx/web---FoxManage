<?php
if(isset($_POST['username'])){
    http_response_code(200);
    echo(var_dump($_POST));
}else{
    http_response_code(500);
    echo(var_dump($_POST));
}