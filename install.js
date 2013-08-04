var mongoDB = require( 'mongodb' ).Db
  , mongoServer = require( 'mongodb' ).Server
  , config = require( './app/config.json' );

var db = new mongoDB( config.db.db, new mongoServer( config.db.server, config.db.port ) );

db.open( function( err, result ) {
  if( !err ) {
    console.log( 'Connected to ' + config.db.server + ', using database ' + config.db.db )
  } else {
    console.dir( err );
  }

  db.createCollection( 'books', { w: 1 }, function( err, collection ) { 
    if( !err ) {
     console.dir( err );
    }
  } );

  db.createCollection( 'tags', { w: 1 }, function( err, collection ) { 
    if( !err ) {
     console.dir( err );
    }
  } );

  var sampleBook = { 
    id: 'Мобильник',
    title: 'Мобильник',
    author: 'Стивен Кинг',
    description: 'Мобильник... Он есть у каждого - у мужчин и женщин, у стариков и детей. Но - что, если однажды чья-то злая воля превратит мобильники в источники смерти и ужаса?! ', 
    isbn: '5170401183',
    language: 'ru',
    tags: [ 'ужасы', 'триллер' ],
    links: [ 
      { 'link': '/download/Мобильник/epub', type: 'epub' },
      { 'link': '/download/Мобильник/fb2', type: 'fb2' }
    ],
    color: '#3498db',
  },
  sampleTag = { 
    title: 'adventure',
    alias: [ 
      { 'ru': 'адвентура' }
    ],
    books: '1'
  };

  collection = db.collection( 'books' );
  collection.save( sampleBook, { w: 1 }, function( err, result ) {
    if( !err ) {
     console.dir( err );
    }
  } );

  collection = db.collection( 'tags' );
  collection.save( sampleTag, { w: 1 }, function( err, result ) {
    if( !err ) {
     console.dir( err );
    }
  } );
  // }
} );