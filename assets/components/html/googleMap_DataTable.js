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
  var checkForState = [];

  $.getJSON("./../../json/mapList.json", function (data) {
    $.each(data, function (key, val) {

      /* ----------------------------------------------------------- */
      /* Create ROW element for Table and Append one by one to Table */
      /* ----------------------------------------------------------- */
      var row =
        `<tr> 
        <td><p>` + val.city + `</p></td> 
        <td><p>` + val.admin + `</p></td> 
        <td><p>` + val.country + `</p></td>  
        <td><p><b>` + val.population_proper + `</b></p></td>  
        <td><p><a href="https://www.google.com/maps/search/?api=1&query=` + val.geometry.coordinates[0] + `,` + val.geometry.coordinates[1] + `" target="blank">Get Direction</a></p></td> 
      </tr>`;
      /* Append one by one row to Table */
      $('#list-container table tbody').append(row);

      /* ----------------------------------------------------------- */
      /* Create Oprions for select filter at left side */
      /* ----------------------------------------------------------- */
      var optCity, optState;

      /* if city has Multiple Values */
      optCity = `<option value="` + val.city.trim().toLowerCase() + `">` + val.city + `</option>`;

      /* Check for Duplicate State */
      if (!checkForState.includes(val.admin.trim().toLowerCase())) {
        checkForState.push(val.admin.trim().toLowerCase());
        optState = `<option value="` + val.admin.trim().toLowerCase() + `">` + val.admin + `</option>`;
      }

      $('#city_filter').append(optCity);
      $('#state_filter').append(optState);

    });

    /* ----------------------------------------- */
    /* Select 2 Init */
    /* ----------------------------------------- */
    $('.custom-select').select2({
      // minimumResultsForSearch: -1,
    });

    /* -------------- */
    /* DataTable Init */
    /* -------------- */
    var listData = $('.data-table').DataTable({
      pagingType: "simple_numbers",
      lengthMenu: -1,
      searching: true,
      pageLength: 12,
      scrollX: true
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

    /* -------------------------------------- */
    /* Init Map */
    /* -------------------------------------- */
    initMap(data);

    /* -------------------------------------- */
    /* Filters in Map */
    /* -------------------------------------- */
    $('.map-list .btn-filter').on('click', data, filterMap);

    $('.map-list .btn-filter').on('click', function () {

      var cityVal = document.querySelector('.map-list #city_filter').value.toLowerCase().trim();
      var stateVal = document.querySelector('.map-list #state_filter').value.toLowerCase().trim();
      var SearchVal = document.querySelector('.map-list #search_text').value.trim();
      

      $('.map-list .list-container tfoot').find('input[name="city"]').val(cityVal);
      $('.map-list .list-container tfoot').find('input[name="state"]').val(stateVal);


      $('.map-list .list-container tfoot').find('input').trigger('change');

      
      /* Filter for *Range of Population* */
      jQuery.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
          
          var popRange = document.querySelector('.map-list input[name="population"]:checked').value.toLowerCase().split(",");
          
          var val = parseInt(aData[3]);
          var min = parseInt(popRange[0]);
          var max = parseInt(popRange[1]);

          if (isNaN(min)) {
            if (popRange[0] == "<" && val < max) {
              return true;
            } else if (popRange[0] == ">" && val > max) {
              return true;
            } else if (popRange[0] == "all") {
              return true;
            }
          } else {
            if (val > min && val < max) {
              return true;
            }
          }
          return false;
        }
      );


      // Check for inpi=ut Value
      if (SearchVal != "") {
        listData.search(SearchVal, true, false).draw();
      } else {
        listData.search('').draw();
      }
    });

  });
});



/* ----------------------------------------- */
/* Google map Integration */
/* ----------------------------------------- */
/* Variable Declarations */
var markers = [];
var markerCluster;
var map;

/* Map init */
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

  /* if you have multiple items (Array) in string formate */
  var city = marker.city.split(',').map(function (x) {
    return x.toLowerCase().trim()
  });

  var state = marker.admin.trim();
  var country = marker.country.trim();
  var population = marker.population_proper.trim();

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
      // map.setZoom(15);
    }
  })(markerMap, content));
}
/* Manage Cluster and Markers after Filter Function */
function clusterManager(array) {
  markerCluster.clearMarkers();
  var bounds = new google.maps.LatLngBounds();

  if (!array.length) {
    jQuery('.alert').addClass('is-visible');
  } else {
    jQuery('.alert').removeClass('is-visible');
    for (i = 0; i < array.length; i++) {
      markerCluster.addMarker(array[i]);
      bounds.extend(array[i].position);
    }
    map.fitBounds(bounds);
  }
}
/* Filtering a MAP */
function filterMap(event) {

  var cityVal = document.querySelector('.map-list #city_filter').value.toLowerCase().trim();
  var stateVal = document.querySelector('.map-list #state_filter').value.toLowerCase().trim();
  var popRange = document.querySelector('.map-list input[name="population"]:checked').value.toLowerCase().split(",");
  var searchStr = document.querySelector('.map-list #search_text').value.trim();


  var json = event.data;
  var arr = [];

  if (searchStr.length > 0) {
    /* executes when search input is not empty */

    var lowerSearch = searchStr.toLowerCase();
    for (var i = 0; i < json.length; i++) {

      /* Checking for select filters */
      if (json[i].city.toLowerCase().includes(cityVal) && json[i].admin.toLowerCase().includes(stateVal)) {

        /* Checking for search input filter */
        if (json[i].city.toLowerCase().includes(lowerSearch) || json[i].admin.toLowerCase().includes(lowerSearch) || json[i].country.toLowerCase().includes(lowerSearch) || json[i].population_proper.includes(lowerSearch)) {

          /* Checking for radio (range) filter */
          if (popRange[0] == "all" || popRange[0] == "<" || popRange[0] == ">") {

            //lessthen popRange[1]
            if (popRange[0] == "<") {
              if (parseInt(json[i].population_proper) < parseInt(popRange[1])) {
                arr.push(markers[i]);
              }
              //greaterthen popRange[1]
            } else if (popRange[0] == ">") {
              if (parseInt(json[i].population_proper) > parseInt(popRange[1])) {
                arr.push(markers[i]);
              }
              //all
            } else {
              arr.push(markers[i]);
            }

          } else {

            //Specific Range
            if (parseInt(json[i].population_proper) > parseInt(popRange[0]) && parseInt(json[i].population_proper) < parseInt(popRange[1])) {
              arr.push(markers[i]);
            }
          }

        }

      }

    }

  } else {

    /* executes when search input is empty */
    for (var i = 0; i < json.length; i++) {

      /* Checking for select filters */
      if (json[i].city.toLowerCase().includes(cityVal) && json[i].admin.toLowerCase().includes(stateVal)) {

        /* Checking for radio (range) filter */
        if (popRange[0] == "all" || popRange[0] == "<" || popRange[0] == ">") {

          //lessthen popRange[1]
          if (popRange[0] == "<") {
            if (parseInt(json[i].population_proper) < parseInt(popRange[1])) {

              arr.push(markers[i]);
            }
            //greaterthen popRange[1]
          } else if (popRange[0] == ">") {
            if (parseInt(json[i].population_proper) > parseInt(popRange[1])) {

              arr.push(markers[i]);
            }
            //all
          } else {
            arr.push(markers[i]);
          }

        } else {

          //Specific Range
          if (parseInt(json[i].population_proper) > parseInt(popRange[0]) && parseInt(json[i].population_proper) < parseInt(popRange[1])) {

            arr.push(markers[i]);
          }
        }

      }
    }
  }
  clusterManager(arr);
}
