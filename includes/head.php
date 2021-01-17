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
        <link rel="stylesheet" href="css/bulma.css">
        <link rel="stylesheet" href="css/ccss.css">
    </head>
    <body>



';

?>

<?php echo($_HEAD) ?>