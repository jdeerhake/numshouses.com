<?php
  DEFINE ('DB_USER', 'numshouses');
  DEFINE ('DB_PASSWORD', 'npjtrn');
  DEFINE ('DB_HOST', 'localhost');
  DEFINE ('DB_NAME', 'numshouses');
  $dbc = @mysql_connect (DB_HOST,DB_USER,DB_PASSWORD) or die('Could not connect to MySQL:' .mysql_error());
  @mysql_select_db (DB_NAME) or die ('Could not select the database:' . mysql_error());

