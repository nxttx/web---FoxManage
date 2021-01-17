<?php
$_FOOTER= null;

if(isset($_SESSION['user'])){
    $_FOOTER = '';
}else{
    $_FOOTER = '';
}

$_FOOTER = '
    <script src="js/script.js"></script>
    </body>
</html>
';

?>

<?php echo($_FOOTER) ?>