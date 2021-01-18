<?php
$_FOOTER= null;

if(isset($_SESSION['user'])){
    $_FOOTER = '
<footer class="footer has-background-light">
  <div class="content has-text-centered">
    <p>
      <strong>FoxManage</strong> by <a href="https://robertboudewijn.nl">Robert Boudewijn</a>. The source code is licensed
      <a href="https://opensource.org/licenses/BSD-2-Clause">BSD</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.<br>
      Copyright 2021 Robert Boudewijn
    </p>
  </div>
</footer>';
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

