<?php
$_HEAD = null;

if (isset($_SESSION['user'])) {
    $_HEAD = '';
} else {
    $_HEAD = '';
}

$_HEAD = '
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>' . $_SITE_TITLE . '</title>
        <link rel="stylesheet" href="css/bulma.css"> <!-- bulma-->
        <link rel="stylesheet" href="css/ccss.css"><!-- custom-->
        <script src="https://kit.fontawesome.com/ae33e372bf.js" crossorigin="anonymous"></script> <!-- fontAwesom-->
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> <!-- Google Charts-->
    </head>
    <body>



';

?>

<?php echo($_HEAD) ?>