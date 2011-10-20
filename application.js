var NUMS = NUMS || {};


NUMS.getPaths = function(continent, attr) {
  var paths = [];
  NUMS.mapData[continent].forEach(function(path, i) {
    paths.push(NUMS.paper.path(path).attr(attr));
  });
  return paths;
}

NUMS.continents = {
  "north_america" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "asia" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "europe" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "africa" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "australia" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "south_america" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  },
  "antarctica" : {
    stroke : "#000",
    fill : "#333",
    hoverFill : "#666",
    opacity : ".6"
  }
}


jQuery(document).ready(function() {
  NUMS.paper = Raphael('map');

  var defaults = {
    "stroke-width": .5,
    "stroke-linejoin": "round"
  };

  function lon2x(lon) {
      var xfactor = 2.6938;
      var xoffset = 465.4;
      var x = (lon * xfactor) + xoffset;
      return x;
  }

  function lat2y(lat) {
      var yfactor = -2.6938;
      var yoffset = 227.066;
      var y = (lat * yfactor) + yoffset;
      return y;
  }


  for(var continent in NUMS.continents) {
    if(NUMS.continents.hasOwnProperty(continent)) {
      NUMS.getPaths(continent, jQuery.extend({}, defaults, NUMS.continents[continent]));
    }
  }


//    for (var countryCode in map) {

//        (function(countryPath, countryCode) {
//            if (visitedCountries[countryCode]) {
//                countryPath.attr({
//                    fill: visitedCountries[countryCode].c
//                });
//            }
//            else {
//                countryPath.attr({
//                    opacity: 0.6
//                });
//                countryPath.color = Raphael.getColor();

//                countryPath[0].onmouseover = function() {
//                    countryPath.animate({
//                        fill: countryPath.color,
//                        stroke: countryPath.color
//                    }, 300);
//                    paper.safari();
//                };
//                countryPath[0].onmouseout = function() {
//                    countryPath.animate({
//                        fill: "#333",
//                        stroke: "#000"
//                    }, 300);
//                    paper.safari();
//                };
//            }
//        })(map[countryCode], countryCode);
//    };
});

