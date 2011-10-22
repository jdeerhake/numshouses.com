var NUMS = NUMS || {};


NUMS.writePathsFromData = function(continent, attr, mouseover, mouseout) {
  var paths = [];
  NUMS.mapData[continent].forEach(function(path, i) {
    var path = NUMS.paper.path(path).attr(attr);
    NUMS.scale(path, NUMS.scale.factor);
    path.hover(mouseover, mouseout);
    paths.push(path);
  });
  return paths;
};

NUMS.scale = function(path, factor, move) {
    path.scale(factor, factor, factor, factor);
};

NUMS.continents = {
  "north_america" : {
    fill : "#1f519a"
  },
  "asia" : {
    fill : "#e2bb44"
  },
  "europe" : {
    fill : "#ae0b20"
  },
  "africa" : {
    fill : "#d74a12"
  },
  "australia" : {
    fill : "#007747"
  },
  "south_america" : {
    fill : "#c12966"
  },
  "antarctica" : {
    fill : "#391d50"
  }
}


jQuery(document).ready(function() {
  NUMS.paper = Raphael('map', '100%', '100%');

  NUMS.scale.factor = (function() {
    var svg = jQuery("svg"),
      heightFactor = svg.height() / NUMS.mapData.height,
      widthFactor = svg.width() / NUMS.mapData.width;

    return heightFactor > widthFactor ? heightFactor : widthFactor;
  }());

  NUMS.scale.hoverFactor = 1.01;



  var defaults = {
    "stroke-width": .5,
    "stroke-linejoin": "round",
    opacity : .4,
    hoverOpacity : .9,
    stroke : false
  };


  for(var continentName in NUMS.continents) {
    if(NUMS.continents.hasOwnProperty(continentName)) {
      (function() {
        var continent = NUMS.continents[continentName],
          attrs = jQuery.extend({}, defaults, continent),
          paths = NUMS.writePathsFromData(continentName, attrs, mouseover, mouseout);

        function mouseover() {
          if(continent.offTimeout) {
            clearTimeout(continent.offTimeout);
            delete continent.offTimeout;
          } else {
            paths.forEach(function(path) {
              path.attr({"opacity" : defaults.hoverOpacity});
              NUMS.scale(path, NUMS.scale.hoverFactor);
            });
          }
        }

        function mouseout() {
          continent.offTimeout = setTimeout(function() {
            delete continent.offTimeout;
            paths.forEach(function(path) {
              path.attr({"opacity" : defaults.opacity});
              NUMS.scale(path, 1 / NUMS.scale.hoverFactor);
            });
          }, 50);
        }
      }());
    }
  }
});

