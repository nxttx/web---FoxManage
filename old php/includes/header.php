<?php
$_HEADER= null;

if(isset($_SESSION['user'])){
    $_HEADER = '
<nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="images/logo.png" width="112" height="28">
    </a>
<!--https://bulma.io/images/bulma-logo.png -->
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        Home
      </a>

      <a class="navbar-item" href="https://mail.axc.nl/" target="_blank">
        Email
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-primary" onclick="logOut()">
            <strong>Logout</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
        
    ';
}else{
    $_HEADER = '

    ';
}

?>

<?php echo($_HEADER) ?>