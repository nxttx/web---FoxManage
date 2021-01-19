<?php
include_once("globals/global.php");

$body = null;

if(isset($_SESSION['user'])){
    $_SITE_TITLE = $_SITE_GLOBAL_COMPANY;





    $body = _MAIN_BODY('
    <h1 class="title">Dashboard</h1>
    
    
    <div class="columns">
        <div class="column">
            <h2 class="subtitle">Domains:</h2>
            <div class="content">
                <ul id="domains">
                    <li>Domain 1</li>
                    <li>Domain 2</li>
                    <li>Domain 3</li>
                </ul>
            </div>
            <h2 class="subtitle">Databases:</h2>
            <div class="content">  
                <ul id="databases">
                    <li>Database 1</li>
                    <li>Database 2</li>
                    <li>Database 3</li>
                </ul>
            </div>      
        </div>
        <div class="column is-5-desktop ">
            <div id="piechart" ></div>
        </div>
    </div>

    
    ');
}else{
    $_SITE_TITLE= $_SITE_GLOBAL_COMPANY.'Admin Area - Login';
    $body = '
<div class="hero is-primary is-fullheight">
    <div class="hero-body">
        <div class="container">
            <div class="columns">
                <div class="column"></div>
                <div class="column is-4 has-text-centered">
                    <h3 class="title has-text-white">Login</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-white">Login to your manager</p>
                    <div class="box">
                        <div class="title has-text-grey is-5" id="infoBox">Please enter your email and password.</div>
                        <form onsubmit="logIn(event)">
                            <div class="field">
                                <label class="label has-text-left" for="username">Username</label>
                                <div class="control has-icons-left">
                                    <input autofocus="" class="input" id="username" placeholder="Username"
                                           type="text">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label has-text-left" for="password">Password</label>
                                <div class="control has-icons-left">
                                    <input class="input" id="password" placeholder="Password"
                                           type="password">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                        <button id="LoginButton" class="button is-block is-primary is-fullwidth">Login</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="">Sign Up</a> &nbsp;·&nbsp;
                        <a href="">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="">Need Help?</a>
                    </p>
                </div>
                <div class="column"></div>
            </div>
        </div>
    </div>
</div>
    ';
}
//var_dump($_SESSION);
include_once("includes/head.php");
include_once("includes/header.php");
echo($body);
include_once("includes/footer.php");
?>