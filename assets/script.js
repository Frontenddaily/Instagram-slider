(function(window, document, $, undefined){
  'use strict';

  new Gallery({
    target: '.image-container',
    access_token: '',
    client_id: '',
    speed: 5000,
    limit: 8
  });
})(window, document, jQuery);
