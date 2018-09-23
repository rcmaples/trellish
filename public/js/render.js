'use strict';

const render = {
  // Render the Page:
  page: function(state) {
    // do stuff.
  },

  collapseBoard: function() {
    $('.collapse').on('click', function(event, data) {
      $(this).toggleClass('flip');
      $('.slide').slideToggle();
    });
  }
};
