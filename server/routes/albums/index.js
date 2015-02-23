'use strict';

var Album = require('../../models/album');
var moment = require('moment');
var primary = require('../../views/helpers/primary');

module.exports = {
  handler: function(request, reply) {
    Album.find({userId: request.auth.credentials._id}).sort(request.query.sort || 'date').exec(function(err, albums) {
      reply.view('templates/albums/index', {albums:albums, moment:moment, primary:primary});
    });
  }
};
