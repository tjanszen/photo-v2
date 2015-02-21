'use strict';

module.exports = function(album) {
  var image;

  if (!album.photos.length) {
    image = '/placeholder.jpg';
  } else if (album.primaryIndex === -1) {
    image = album.photos[0];
  } else {
    image = album.photos[album.primaryIndex];
  }

  return image;
};
