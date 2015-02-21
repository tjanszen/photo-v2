'use strict';

var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.findById(request.params.albumId, function(err, album) {
      reply.view('templates/albums/show', {album:album});
    });
  }
};
