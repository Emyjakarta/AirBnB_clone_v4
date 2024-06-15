$(document).ready(function () {
	const amenitiesFourthHeader = $('div.amenities h4');
	const amenities = $('div.amenities .popover ul input:checkbox');
	const amenitiesDictRep = {};

	amenities.on('click', function () {
		const dataId = $(this).attr('data-id');

		if ($(this).is(':checked')) {
			const dataName = $(this).attr('data-name');

			amenitiesDictRep[dataId.toString()] = dataName;
		} else {
			delete amenitiesDictRep[dataId];
		}

		amenitiesFourthHeader.text(Object.values(amenitiesDictRep).join(', '));
	});
	$.get('http://localhost:5001/api/v1/status', (data, status) => {
		if (status === 'success') {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			}
		} else {
			$('#api_status').removeClass('available');
		}
	});
});
