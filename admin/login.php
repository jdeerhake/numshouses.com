<?php
  require_once('../db.php');
  require_once('../query.class.php');

  session_start();

  if(isset($_SESSION['authenticated']) && $_SESSION['authenticated'] == true ) {
    header('Location: /admin/index.php');
  } else if(isset($_REQUEST['name']) || isset($_REQUEST['password'])) {
    $q = new Query("select", "users");
    $q->addClause("name", mysql_real_escape_string($_REQUEST['name']))
      ->addClause("password", sha1($_REQUEST['password']))
      ->buildQuery();

    if(count($q->result)) {
      print_r($q->result);
      $_SESSION['authenticated'] = true;
      header('Location: /admin/index.php');
    } else {
      $bad_pass = true;
    }
  }
?>
<!doctype html>
<html>
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script src="/polyfill.js"></script>
  <script src="/admin/noisy.min.js"></script>
  <script src="/admin/admin.js"></script>

  <link rel="stylesheet" href="/admin/admin.css" type="text/css" media="screen" charset="utf-8" />
</head>
<body>
  <form method="post" class="login">
    <?php if(isset($bad_pass)) echo "Bad user name or password.<br />"; ?>
    <div class="form_row clearfix">
      <label for="name">User name:</label>
      <input type="text" id="name" name="name">
    </div>

    <div class="form_row clearfix">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
    </div>

    <div class="form_row submit clearfix">
      <input type="submit" value="Log in">
    </div>
  </form>
</body>
</html>

