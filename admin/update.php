<?php
  require_once('../db.php');
  require_once('../query.class.php');

  session_start();

  if($_SESSION['authenticated'] != true ) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Not authorized";
    die();
  }

  if(isset($_REQUEST['points']) && isset($_REQUEST['continent'])) {
    $q = new Query("update", "continents");
    $q->addClause("id", mysql_real_escape_string((int)$_REQUEST['continent']))
      ->addNewValue("points", mysql_real_escape_string((int)$_REQUEST['points']));
    if($q->buildQuery()) {
      echo (int)$_REQUEST['points'];
    }
  }
?>

