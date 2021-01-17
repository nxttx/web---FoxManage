<?php
session_start();
$_SITE_GLOBAL_COMPANY = "Foxels";
include_once("includes/aside.php");


function _MAIN_BODY($A){
    return '
    <section >
        <div class="columns">
            <div class="column is-2 has-background-light CS-has-padding-left-2 CS-has-padding-top-2"> ' . ASIDE(). '</div>
            <div class="column">
                <div class="container">
                    '.$A.'
                </div>
            </div>
        </div>
    </section>
    ';
}
?>
