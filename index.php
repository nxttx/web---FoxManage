<?php
include_once("globals/global.php");

$body = null;

if(isset($_SESSION['user'])){
    $_SITE_TITLE = $_SITE_GLOBAL_COMPANY;
    $body = _MAIN_BODY('
    HELLOOO
    
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

                        <div class="field">
                            <label class="label has-text-left" for="username">Username</label>
                            <div class="control">
                                <input autofocus="" class="input" id="username" placeholder="Username"
                                       type="text">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label has-text-left" for="password">Password</label>
                            <div class="control">
                                <input class="input" id="password" placeholder="Password"
                                       type="password">
                            </div>
                        </div>
                        <button id="LoginButton" class="button is-block is-primary is-fullwidth" onclick="logIn()">Login</button>
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

include_once("includes/head.php");
include_once("includes/header.php");
echo($body);
include_once("includes/footer.php");
?>