
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./app/config.json')
  , books = require('./app/modules/books');

var app = express();

// all environments
app.set('port', process.env.PORT || config.server.port);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('zWFihu3235dhvg7234'));
app.use(express.session());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/books', books.list);
app.get('/books/:id', books.view);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
