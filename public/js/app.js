'use strict';

function jinkies() {
  $('#jq-dropdown-id-1')
    .on('show', function(event, dropdownData) {
      console.log(dropdownData);
    })
    .on('hide', function(event, dropdownData) {
      console.log(dropdownData);
    });
}

$('.collapse').on('click', function(event, data) {
  $('.slide').slideToggle();
});

$(jinkies);
