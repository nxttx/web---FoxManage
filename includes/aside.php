<?php
function ASIDE ()
{
$_ASIDE_BODY= '
<aside class="menu">
    <p class="menu-label">
        General
    </p>
    <ul class="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Customers</a></li>
    </ul>
    <p class="menu-label">
        Transactions
    </p>
    <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
    </ul>
    <p class="menu-label">
        Data
    </p>
    <progress id="usedDataSlider" class="progress is-primary" max="100"></progress>
    <p id="usedDataText">Loading...</p>
</aside>';
return $_ASIDE_BODY;
}