$(document).ready(function () {
  const amenitiesFourthHeader = $('div.amenities h4');
  const amenities = $('div.amenities .popover ul input:checkbox');
  const amenitiesDictRep = {};

  // Eliminate checks from checkboxes should they be there after reload
  amenities.each(function () {
    if ($(this).is(':checked')) {
      $(this).prop('checked', false);
    }
  });

  amenities.on('click', function () {
    const dataId = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      const dataName = $(this).attr('data-name');

      amenitiesDictRep[dataId.toString()] = dataName;
    } else {
      delete amenitiesDictRep[dataId];
    }

    // filter simultaneously as the user selects the filters and format the texts
    amenitiesFourthHeader.text(
      Object.values(amenitiesDictRep).slice(0, 3).join(', ') +
			`${Object.keys(amenitiesDictRep).length > 3 ? '...' : ''}`
    );
    retrieve_places({ amenities: Object.keys(amenitiesDictRep) });
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

  function retrieve_places (data = {}) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: (places_data) => {
        const places = $('section.places');
        places.empty();
        for (data in places_data) {
          const place = places_data[data];
          $(
						`<article>
	  <div class="title_box">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">
	    $${place.price_by_night}
	  </div>
	  </div>
	  <div class="information">
	      <div class="max_guest">
		${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}
	      </div>
	      <div class="number_rooms">
		${place.number_rooms} Bedroom${
			place.number_rooms != 1 ? 's' : ''
		}
	      </div>
	      <div class="number_bathrooms">
		${place.number_bathrooms} Bathroom${
			place.number_bathrooms != 1 ? 's' : ''
		}
	      </div>
	    </div>
	    <div class="description">${place.description}</div>
	</article>`
          ).appendTo(places);
        }
      },
      error: () => {
        alert('Failed to retrieve data');
      }
    });
  }
  // retrieve all available places
  retrieve_places();

  // filter places based on the amenities requested
  $('button').on('click', () => {
    retrieve_places({ amenities: Object.keys(amenitiesDictRep) });
  });
});
