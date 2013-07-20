var MongoClient = require( 'mongodb' ).MongoClient
  , config = require( './app/config.json' );

MongoClient.connect( 'mongodb://' + config.db.server + ':' + config.db.port + '/' + config.db.db, function( err, db ) {
  if( !err ) {
    console.log( 'Connected to ' + config.db.server + ', using ' + config.db.db )
  } else {
    console.dir( err );
  }

  db.createCollection( 'books', { w: 1 }, function( err, collection ) { 
    if( !err ) {
     console.dir( err );
    }
  } );

  var sampleBook = { title: 'Dune', author: 'Frank Herbert', description: 'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny', isbn: '0441013597', language: 'en' },
      collection = db.collection( 'books' );

  // if( collection.find( { title: sampleBook.title } ) === false ) {
    collection.save( sampleBook, { w: 1 }, function( err, result ) {
      if( !err ) {
       console.dir( err );
      }
    } );
  // }
} );