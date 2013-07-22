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

  var sampleBook = { 
      id: 'Dune',
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny', isbn: '0441013597',
      language: 'en',
      color: '#e74c3c',
      tags: [ 'thriller', 'adventure' ],
      links: [ 
        { 'link': '/download/Dune/epub', type: 'epub' },
        { 'link': '/download/Dune/pdf', type: 'pdf' }
      ] },
    collection = db.collection( 'books' );

  // if( collection.find( { title: sampleBook.title } ) === false ) {
    collection.save( sampleBook, { w: 1 }, function( err, result ) {
      if( !err ) {
       console.dir( err );
      }
    } );
  // }
} );