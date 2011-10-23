<?php
  require_once('../db.php');
  require_once('../query.class.php');

  session_start();

  if($_SESSION['authenticated'] != true ) {
    header('Location: /admin/login.php');
  }

  $q = new Query("select", "continents");
  $q->buildQuery();

  foreach($q->result as $index => $current) {
    $q->result[$index]['name'] = ucwords(str_replace("_", " ", $current['name']));
  }
?>
<!doctype html>
<html>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script src="/polyfill.js"></script>
  <script src="/admin/noisy.min.js"></script>
  <script src="/admin/admin.js"></script>

  <link rel="stylesheet" href="/admin/admin.css" type="text/css" media="screen" charset="utf-8" />
<head>
</head>
<body>
  <a id="logout" href="/admin/logout.php">Log out</a>
  <div class="points">
  <!--<?php print_r($_SERVER['HTTP_ACCEPT']); ?>-->
  <?php foreach($q->result as $current) { ?>
  <form method="post" class="form_row point_update">
    <label for="<?=$current['name']?>"><?=$current['name']?></label>
    <input type="text" value="<?=$current['points']?>" id="<?=$current['name']?>" name="points">
    <input type="hidden" value="<?=$current['id']?>" name="continent">
    <input type="submit" value="Save" class="save">
  </form>
  <?php } ?>

  </div>
</body>
</html>

