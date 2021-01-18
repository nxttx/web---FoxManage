<?php

/*
 *  This function builds the normal aside for a page.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @return {String}
 */
function ASIDE (){
$_ASIDE_BODY= '
<aside class="menu">
    <p class="menu-label">
        General
    </p>
    <ul class="menu-list">
        <li><a href="/">Dashboard</a></li>
        <li><a>Domains</a></li>
        <li><a>Databases</a></li>
    </ul>
';

if($_SESSION['adminRights']) {
    $_ASIDE_BODY.='
        <p class="menu-label">
            Admin
        </p>  
        <ul class="menu-list" >
            <li ><a>Manage Your Users</a>
            <ul>
                <li><a>Members</a></li>
                <li><a>Add a member</a></li>
            </ul>
            </li >
            <li><a>Cloud Storage Environment Settings</a></li>
            <li><a>Authentication</a></li>
        </ul >';
}

$_ASIDE_BODY.='
    <p class="menu-label">
        Data
    </p>
    <progress id="usedDataSlider" class="progress is-primary" max="100"></progress>
    <p id="usedDataText">Loading...</p>
</aside>';
return $_ASIDE_BODY;
}