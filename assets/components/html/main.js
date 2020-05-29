$(document).ready(function () {
  /* ------------------------------------- */
  /* Theme Switcher js */
  /* ------------------------------------- */

  var $input = $('.map-list_swich input[name="switch"]')
  $input.on('click', function () {
    $('.map-list_swich .input-radio').removeClass('active');
    $(this).closest('.input-radio').addClass('active');
    var target = $(this).attr('data-target');

    $(this).closest('.map-list').find('.map-list_container > div').removeClass('show');
    $(this).closest('.map-list').find(target).addClass('show');
  })

  /* -------------------------------- */
  /* Getting JSON Data From JSON file */
  /* -------------------------------- */
  $.getJSON("./../../json/mapList.json", function (data) {
    $.each(data, function (key, val) {
      var row =
        `<tr> 
        <td><p>` + val.city + `</p></td> 
        <td><p>` + val.admin + `</p></td> 
        <td><p>` + val.country + `</p></td>  
        <td><p><b>` + val.population_proper + `</b></p></td>  
        <td><p><a href="https://www.google.com/maps/search/?api=1&query=` + val.geometry.coordinates[0] + `,` + val.geometry.coordinates[1] + `" target="blank">Get Direction</a></p></td> 
      </tr>`
      $('#list-container table tbody').append(row);
    });

    /* -------------- */
    /* DataTable Init */
    /* -------------- */
    var listData = $('.data-table').DataTable({
      pagingType: "simple_numbers",
      lengthMenu: -1,
      searching: true,
    });

    /* -------------------------------------- */
    /* Append Search box to tfoot colunm wise */
    /* -------------------------------------- */
    $('.map-list .data-table tfoot th').each(function () {
      var title = $(this).text();
      if (title != "") {
        $(this).html('<input type="text" placeholder="Search ' + title + '" name="' + title.toLowerCase() + '"/>');
      }
      $(this).hide();
    });

    /* -------------------------------------- */
    /* Make Search in columns */
    /* -------------------------------------- */
    listData.columns().every(function () {
      var that = this;
      $(this.footer()).on('keyup change', 'input', function () {
        if (that.search() !== this.value) {
          that.search(this.value).draw();
        }
      });
    });

    /* Set Markers to Map */
    initMap(data);

  });

});


/* ----------------------------------------- */
/* Google map Integration */
/* ----------------------------------------- */
/* Variable Declarations */
var markers = [];
var markerCluster;
var map;

function initMap(data) {
  map = new google.maps.Map(document.getElementById('filterMap'), {
    zoom: 6,
    maxZoom: 15,
    // center: new google.maps.LatLng(
    //   20.5937, 78.9629
    // )
  });

  for (var i = 0; i < data.length; i++) {
    setMarkers(data[i], map);
  }

  markerCluster = new MarkerClusterer(map, markers, {
    ignoreHiddenMarkers: true,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });

  var bounds = new google.maps.LatLngBounds();
  for (i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);

}

/* Set Markers Function */
function setMarkers(marker, map) {
  /*  Assign Values */
  var markerMap = marker.geometry.coordinates;
  var city = marker.city.trim();
  var state = marker.admin.trim();
  var country = marker.country.trim();
  var population = marker.population_proper.trim();

  
  /* if you have multiple items (Array) in string formate */
  /* 
    var type = marker.type.split(',').map(function (x) {
      return x.toLowerCase().trim()
    }); 
  */

  var pos = new google.maps.LatLng(markerMap[0], markerMap[1]);
  var content = marker;

  markerMap = new google.maps.Marker({
    position: pos,

    city: city,
    state: state,
    country: country,
    population: population,
    map: map,

  });



  markers.push(markerMap);

  var infowindow = new google.maps.InfoWindow({
    content: '<h6 style="margin-bottom:6px;"> ' + city + '</h6><p style="margin-bottom:10px;">' + state + '</p>' + '<p class="fs-16">Population : <b>' + population + '</b></p>'
  });


  // Marker click listener
  google.maps.event.addListener(markerMap, 'click', (function (
    marker1, content) {
    return function () {
      infowindow.setContent(content);
      infowindow.open(map, markerMap);
      map.panTo(this.getPosition());
      map.setZoom(15);
    }
  })(markerMap, content));
}
