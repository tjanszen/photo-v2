'use strict';

var Album = require('../../models/album');

module.exports = {
  payload:{
    maxBytes: 16777216, // 2^24 ; 16MB
    output:'stream',
    parse: true,
    timeout: 60000
  },
  handler: function(request, reply) {
    var photos = [].concat(request.payload.photos);

    if (photos.length === 1 && !photos[0].hapi.filename) {
      photos.pop();
    }

    Album.findById(request.params.albumId, function(err, album) {
      album.upload(photos, function() {
        album.save(function() {
          reply.redirect('/albums/' + album._id);
        });
      });
    });
  }
};
