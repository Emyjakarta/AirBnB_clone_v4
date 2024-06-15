$(document).ready(function () {
  var isChecked = $(":checkbox").is(":ischecked");
  var amenityID = $(":checkbox").data("id");
  var amenityName = $(":checkbox").data("name");
  var amenitiesList = [];
  if (isChecked) {
    amenitiesList.push(amenityID);
  } else {
    amenitiesList.pop(amenityID);
  }

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data, status) {
    if (status == "success") {
      if (data.status == "OK") {
        $("#api_status").addClass("available");
      }
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
