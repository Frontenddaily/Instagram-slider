(function(window, document, $, undefined){
  'use strict';

  function Gallery(options){
    var
      self = this,
      access_token = options.access_token,
      client_id = options.client_id,
      url = [
        'https://api.instagram.com/v1/users/self/media/recent/?client_id=' + client_id,
        'access_token=' + access_token,
        'callback=_galleryCallbackFunction'
      ].join('&');

    this.limit = options.limit || 8;
    this.speed = options.speed || 5000;
    this.target = $(options.target)[0];

    window._galleryCallbackFunction = function callbackFunction(data){
      self.data = data.data;
      self.initialise();
    };

    $.getScript(url);
  }

  Gallery.prototype.initialise = function(){
    var
      i,
      item,
      image,
      self = this,
      limit = (this.data.length > this.limit)? this.limit : this.data.length;

    limit = limit - 1;

    this.slides = {
      current: 0,
      total: this.data.length
    };

    for(i = limit; i >= 0; i--){
      item = this.data[i];
      image = document.createElement('img');
      image.src = item.images.standard_resolution.url;
      this.target.appendChild(image);
    }

    this.slides.current = i;

    setInterval(function(){
      self.nextSlide();
    }, this.speed);
  };

  Gallery.prototype.nextSlide = function(){
    var
      self = this,
      image = document.createElement('img'),
      item;

    if((this.slides.current + 1) < this.slides.total){
      this.slides.current++;
    }else{
      this.slides.current = 0;
    }

    item = this.data[this.slides.current];

    image.src = item.images.thumbnail.url;
    image.classList += 'new-image';
    this.target.insertBefore(image, this.target.firstChild);
    this.target.lastChild.remove();

    setTimeout(function(){
      self.target.firstChild.classList = '';
    }, self.speed/3);
  };

  window.Gallery = Gallery;
})(window, document, jQuery);
