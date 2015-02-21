'use strict';

var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.findById(request.params.albumId, function(err, album) {
      album.primaryIndex = request.payload.index;
      album.save(function() {
        reply.redirect('/albums/' + album._id);
      });
    });
  }
};
