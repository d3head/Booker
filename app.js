/**
 * Module dependencies.
 */

var express	= require( 'express' )
  , mongoDB	= require( 'mongodb' ).Db
  , mongoServer	= require( 'mongodb' ).Server
  , config = require( './app/config.json' )
  , cors = require('cors');

var app	= express()
	, db	= new mongoDB( config.db.db, new mongoServer( config.db.server, config.db.port ), { w: 1 } );

var books	= require( './app/modules/books' )( db )
  , categories	= require( './app/modules/categories' )( db )
  , authors	= require( './app/modules/authors' )( db )
	, stats	= require( './app/modules/stats' )( db );

// all environments
app.set( 'port', process.env.PORT || config.server.port );
app.set( 'env', config.server.env );

app.use(cors());

// gzip
app.use( express.logger( ) );
app.use( express.compress( ) );
app.use( express.methodOverride( ) );
app.use( express.bodyParser( ) );

// development only
if ( 'development' == app.get( 'env' ) ) {
	app.use( express.errorHandler( ) );
	app.use( express.logger( 'dev' ) );
}

app.listen( app.get( 'port' ), function( ) {
	console.log( 'Express server listening on port ' + app.get( 'port' ) );
});

db.open( function( err, result ) {
  if( !err ) {
    console.log( 'Connect opened to ' + config.db.server + ', using database ' + config.db.db )
  } else {
    console.dir( err );
  }
} );

db.on( 'close', function( err, result ) {
  console.log( 'Connection to database was closed' );
} );

app.all( '/*', function( req, res, next ) {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
} );

app.get( '/', books.list );
app.post( '/books', books.create );
app.post( '/books/upload', books.upload );
app.get( '/books', books.list );
app.get( '/books/search', books.search );
app.get( '/books/search/:name', books.search );
app.get( '/books/:name', books.view );
app.put( '/books/:id', books.edit );
app.del( '/books/:id', books.delete );

app.get( '/categories', books.list );
app.get( '/categories/:name', categories.view );

app.get( '/authors', authors.list );
app.get( '/authors/:name', authors.view );

app.get( '/stats', stats.get );
