jQuery("document").ready(function() {
  jQuery("body").noisy();

  jQuery("form.point_update").each(function() {
    var $this = jQuery(this),
      field = $this.find("[type=text]"),
      timeout;

    $this.find("[type=submit]").hide();

    jQuery("<button>+1</button>").appendTo($this).bind("click", function(ev) {
      field.attr("value", parseInt(field.attr("value"), 10) + 1).trigger("change");
      return false;
    });

    field.bind("change", function() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        jQuery.ajax({
          url : "/admin/update.php",
          data : $this.serialize(),
          type : "post",
          success : function(data) {
            field.attr("value", data);
            flash(field);
          }
        });
      }, 200);
    });
  });

  function flash(field) {
    field.parents(".form_row").css("background-color", "rgba(255,255,255, .2)");
    setTimeout(function() {
      field.parents(".form_row").removeAttr("style");
    }, 2000);
  }
});

