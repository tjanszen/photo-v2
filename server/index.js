'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var plugins = require('./config/plugins');
var routes = require('./config/routes');
var authentication = require('./config/authentication');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
server.connection({port:process.env.PORT});

mongoose.connection.once('open', function() {
  server.views(require('./config/views'));
  server.register(plugins, function() {
    server.auth.strategy('session', 'cookie', true, authentication);
    server.route(routes);
    server.start(function() {
      console.log('info', server.info.uri);
      console.log('info', process.env.MONGO_URL);
    });
  });
});

var _ = require('lodash');

server.ext('onPreResponse', function(request, reply){
  if(!request.response.source){
    return reply.continue();
  }

  console.log('i am in your site *********');
  console.log('user info', request.auth.credentials);
  console.log('current route data', request.response.source.context);
  // console.log('current route path', request.response.source.context.path);

  var c = request.auth.credentials || {};
  var r = request.response.source.context || {};
  var o = _.merge(c, r);

  console.log('final obj', o);
  console.log('\n\n\n\n');

  request.response.source.context = o;

  return reply.continue();
});
