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
    name : "North America",
    fill : "#1f519a",
    score : 0,
    label : {
      dx : 0,
      dy : 0
    }
  },
  "asia" : {
    name : "Asia",
    fill : "#e2bb44",
    score : 0,
    label : {
      dx : 0,
      dy : 0
    }
  },
  "europe" : {
    name : "Europe",
    fill : "#ae0b20",
    score : 0,
    label : {
      dx : -50,
      dy : -50
    }
  },
  "africa" : {
    name : "Africa",
    fill : "#d74a12",
    score : 0,
    label : {
      dx : -80,
      dy : 20
    }
  },
  "australia" : {
    name : "Australia",
    fill : "#007747",
    score : 0,
    label : {
      dx : -250,
      dy : -30
    }
  },
  "south_america" : {
    name : "South America",
    fill : "#c12966",
    score : 0,
    label : {
      dx : 0,
      dy : 0
    }
  },
  "antarctica" : {
    name : "Antarctica",
    fill : "#391d50",
    score : 0,
    label : {
      dx : 0,
      dy : 0
    }
  }
};

NUMS.label = function(text, type, x, y) {
  return jQuery("<div class='" + type + " label'>" + text + "</div>").css({
    top : y + "px",
    left : x + "px"
  }).hide().appendTo("body");
}


jQuery(document).ready(function() {
  NUMS.paper = Raphael('map', '100%', '100%');

  NUMS.scale.factor = (function() {
    var svg = jQuery("svg"),
      heightFactor = svg.height() / NUMS.mapData.height,
      widthFactor = svg.width() / NUMS.mapData.width;

    return heightFactor > widthFactor ? heightFactor : widthFactor;
  }());


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
          paths = NUMS.writePathsFromData(continentName, attrs, mouseover, mouseout),
          bbox = paths[paths.length === 1 ? 0 : Math.round(paths.length / 2)].getBBox(),
          nameLabel = NUMS.label(continent.name, "continent", bbox.x + continent.label.dx, bbox.y + continent.label.dy);

        //continents.scoreLabel.el = NUMS.label(continent.score, "score", )

        function mouseover() {
          if(continent.offTimeout) {
            clearTimeout(continent.offTimeout);
            delete continent.offTimeout;
          } else {
            nameLabel.show();
            paths.forEach(function(path) {
              path.animate({"opacity" : defaults.hoverOpacity}, 200);
              //NUMS.scale(path, NUMS.scale.hoverFactor);
            });
          }
        }

        function mouseout() {
          continent.offTimeout = setTimeout(function() {
            delete continent.offTimeout;
            nameLabel.hide();
            paths.forEach(function(path) {
              path.animate({"opacity" : defaults.opacity}, 200);
              //NUMS.scale(path, 1 / NUMS.scale.hoverFactor);
            });
          }, 50);
        }
      }());
    }
  }
});

