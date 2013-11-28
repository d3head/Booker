/*
 * Books
 */
module.exports = function( db ) {
  return {
    list: function( req, res ) {
      db.collection( 'books' ).find( ).sort( {date: -1} ).toArray( function( err, items ) {
        //if( items.length > 0 ) {
          res.send( 200, items );
        //} else {
        //  res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Database is empty' } );
        //}
      } );
    },
    
    upload: function( req, res ) {
      var request = req.files;
      var format = request.file.name.split(".").pop();
      var title = req.body.title + '.' + format;
      
      var serverPath = '/books/' + title;
     
      require('fs').rename(request.file.path, '/Users/d3head/Documents/Projects/Booker/' + serverPath, function(error) {
          if(error) {
            res.send( 200, { description: 'Ah crap! Something bad happened' } );
            return;
          }
        
        res.send( 201, { link: '/download/' + req.body.title + '/' + format, type: format } );
        }
      );
    },

    create: function( req, res ) {
      var request = req.body;

      if( request.title && request.description && request.author && request.tags ) {
        
        var newBook = {
          originaltitle: request.originaltitle,
          title: request.title,
          description: request.description,
          author: request.author,
          isbn: request.isbn,
          tags: request.tags,
          links: request.links,
          date: new Date()
        }
				
				db.collection( 'books' ).insert( newBook, { safe: true }, function(err, records){
				  console.log("Record added as "+records[0]._id);
				
          /*for( var i = 0; i < request.tags.length; i++ ) {
            db.collection( 'tags' ).find( { 'title' : request.tags[i] } ).toArray( function( err, items ) {
              if( items.length > 0 ) {
                db.collection( 'tags' ).update( { 
                  title: request.tags[i]
                }, {
                  $inc: { books : 1 }
                } );
              } else {
                db.collection( 'tags' ).insert( {
                  title: request.tags[i],
                  books: 1
                } );
              }
            }	);			
          }*/
      
          res.send( 201, { 'status': 'ok', 'code': '201', 'description': 'Book ' + request.title + ' now available on /books/' + request.title } );
        });

      } else if( !request.title ) {
        res.send( 200, { 'status': 'error', 'code': '400', 'description': 'Missed title' } );
      } else if( !request.description ) {
        res.send( 200, { 'status': 'error', 'code': '400', 'description': 'Missed description' } );
      } else if( !request.author ) {
        res.send( 200, { 'status': 'error', 'code': '400', 'description': 'Missed author' } );
      } else if( !request.tags ) {
        res.send( 200, { 'status': 'error', 'code': '400', 'description': 'Missed tags' } );
      }
    },

    view: function( req, res ) {
      db.collection( 'books' ).find( { 'title' : req.params[ 'name' ] } ).limit(1).toArray( function( err, items ) {

        //if( items.length > 0 ) {
          res.send( 200, items );
        //} else {
        //  res.send( 200, { 'status': 'error', 'code': '400', 'description': 'Book not found' } );
        //}

      });
    },
    
    search: function( req, res ) {
      var query = new RegExp( req.params[ 'name' ], "i" );
      
      db.collection( 'books' ).find( { 'title' : query } ).sort( {date: -1} ).toArray( function( err, items_t ) {
        db.collection( 'books' ).find( { 'author' : query } ).sort( {date: -1} ).toArray( function( err, items_a ) {
          db.collection( 'books' ).find( { 'tags' : query } ).sort( {date: -1} ).toArray( function( err, items ) {
            res.send( 200, items.concat(items_a, items_t) );
          });
        });
      });
    },

    edit: function( req, res ) {
      var request = req.body;

      if( request.old && request.title && request.description && request.author && request.category && request.tags ) {
        db.collection( 'books' ).update( { 
          title: request.old
        }, {
          _id: request.title,
          title: request.title,
          description: request.description,
          author: request.author,
          category: request.category,
          tags: request.tags
        } );
				
        for( var i = 0; i < request.tags.length; i++ ) {
          db.collection( 'tags' ).find( { 'title' : request.tags[i] } ).toArray( function( err, items ) {
            if( items.length > 0 ) {
              db.collection( 'tags' ).update( { 
                title: request.tags[i]
              }, {
                $inc: { books : 1 }
              } );
            } else {
              db.collection( 'tags' ).save( {
                title: request.tags[i],
                books: 1
              } );
            }
          }	);			
        }

        res.send( 201, { 'status': 'ok', 'code': '200', 'description': 'Updated book ' + request.title + ' now available on /books/' + request.title } );
      } else if( !request.old ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed query' } );
      } else if( !request.title ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed title' } );
      } else if( !request.description ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed description' } );
      } else if( !request.author ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed author' } );
      } else if( !request.category ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed category' } );
      } else if( !request.tags ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed tags' } );
      } 
    },

    delete: function( req, res ) {
      var title = req.params[ 'id' ];

      if( title ) {
        db.collection( 'books' ).remove( { 
          _id: title
        } );
				
        db.collection( 'books' ).find( { '_id': title } ).distinct( 'tags', {}, function( err, tags ) {
          for( var i = 0; i < tags.length; i++ ) {
            db.collection( 'tags' ).find( { 'title' : tags[i] } ).toArray( function( err, items ) {
              if( items.length > 0 ) {
                db.collection( 'tags' ).update( { 
                  title: tags[i]
                }, {
                  $inc: { books : -1 }
                } );
              }
            }	);
          }
        } );

        res.send( 201, { 'status': 'ok', 'code': '200', 'description': 'Book ' + title + ' removed' } );
      } else if( !title ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed title or id' } );
      }
    }
  }
}