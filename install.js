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
    id: 'Steve Jobs',
    title: 'Steve Jobs',
    author: 'Уолтер Айзексон',
    description: 'В основу этой биографии легли беседы с самим Стивом Джобсом, а также с его родственниками, друзьями, врагами, соперниками и коллегами. Джобс никак не контролировал автора. Он откровенно отвечал на все вопросы и ждал такой же честности от остальных. Это рассказ о жизни, полной падений и взлетов, о сильном человеке и талантливом бизнесмене, который одним из первых понял: чтобы добиться успеха в XXI веке, нужно соединить креативность и технологии.', 
    isbn: '9785271393785',
    language: 'ru',
    tags: [ 'биография' ],
    links: [ 
      { 'link': '/download/Steve Jobs/epub', type: 'epub' },
      { 'link': '/download/Steve Jobs/fb2', type: 'fb2' }
    ],
    color: '#2980b9',
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