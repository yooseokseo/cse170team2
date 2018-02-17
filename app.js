
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var dataSelector = require('./routes/dataSelector');
var right = require('./routes/right');
var left = require('./routes/left');
var info = require('./routes/info');
var share = require('./routes/share');
var show = require('./routes/show');
var external = require('./routes/external');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/itemID/share')
app.get('/sharedlink/:itemId/show', share.linkview);
app.get('/sharedlink/:itemId/show/info', share.infoview);
app.get('/:categoryTitle', dataSelector.view);
app.get('/:categoryTitle/right', right.view);
app.get('/:categoryTitle/left', left.view);
app.get('/:categoryTitle/:itemId/info', info.view);
app.get('/:categoryTitle/:itemId/share', share.view);
app.get('/:categoryTitle/:itemId/show', show.view);
app.get('/:categoryTitle/:itemId/info/:externalId/external', external.view);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
