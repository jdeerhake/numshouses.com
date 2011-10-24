<!doctype html>
<html>
<head>
  <style>
    body { width: 95%; height: 95%; background: #eee; }
    html, #map { width: 100%; height: 100%; }

    .label {
      padding: 10px 15px;
      -webkit-border-radius: 10px;
      background: gray;
      background-color: rgba(0,0,0,.6);
      font-size: 16px;
      font-family: Georgia, Times, serif;
      color: #fff;
      position: absolute;
      z-index: 1000;
    }
  </style>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script src="/admin/noisy.min.js"></script>
  <script src="/polyfill.js"></script>
  <script src="/raphael-min.js"></script>
  <script src="/map.js"></script>
  <script src="/application.js"></script>
  <script><?php require_once('get_points.php'); ?></script>
</head>
<body>
  <div id="map"></div>
</body>
</html>

