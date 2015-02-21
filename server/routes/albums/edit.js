'use strict';

var Album = require('../../models/album');
var moment = require('moment');

module.exports = {
  handler: function(request, reply) {
    Album.findById(request.params.albumId, function(err, album) {
      reply.view('templates/albums/edit', {album:album, moment:moment});
    });
  }
};
