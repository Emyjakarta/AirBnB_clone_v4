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
});
