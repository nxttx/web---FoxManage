<?php
session_start();
$_SITE_GLOBAL_COMPANY = "Foxels";
include_once("includes/aside.php");

/*
 *  This function build the normal body for a page. With the correct spacing and aside.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @param {String} $A
 *  @return {String}
 */
function _MAIN_BODY($A){
    return '
    <section >
        <div class="columns">
            <div class="column is-2 has-background-light CS-has-padding-left-2 CS-has-padding-top-2 CS-has-padding-bottom-2"> ' . ASIDE(). '</div>
            <div class="column">
                <div class="container CS-has-padding-left-1">
                    '.$A.'
                </div>
            </div>
        </div>
    </section>
    ';
}
?>
