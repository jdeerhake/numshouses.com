<?php
require_once("db.php");
require_once("query.class.php");

$q = new Query("select", "continents");

$q->buildQuery();

echo "NUMS.setPoints(" . json_encode($q->result) . ")";

