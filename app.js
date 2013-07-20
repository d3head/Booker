/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./app/config.json')
  , books = require('./app/modules/books')
  , categories = require('./app/modules/categories')
  , authors = require('./app/modules/authors');

var app = express();

// all environments
app.set('port', process.env.PORT || config.server.port);

// gzip
app.use(express.logger());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', books.list);

app.get('/books', books.list);
app.post('/books', books.create);
app.get('/books/:id', books.view);
app.put('/books/:id', books.edit);
app.del('/books/:id', books.delete);

app.get('/categories', categories.list);
app.post('/categories', categories.create);
app.get('/categories/:name', categories.view);
app.put('/categories/:name', categories.edit);
app.del('/categories/:name', categories.delete);

app.get('/authors', authors.list);
app.post('/authors', authors.create);
app.get('/authors/:id', authors.view);
app.put('/authors/:id', authors.edit);
app.del('/authors/:id', authors.delete);