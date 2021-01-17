<?php
$_FOOTER= null;

if(isset($_SESSION['user'])){
    $_FOOTER = '';
}else{
    $_FOOTER = '';
}

?>

<?php
echo($_FOOTER);
echo('
    <script src="js/script.js"></script>
    </body>
</html>
');
?>

