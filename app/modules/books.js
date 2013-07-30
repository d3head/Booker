/*
 * Books
 */
module.exports = function( db ) {
  return {
    list: function( req, res ) {
      db.collection( 'books' ).find( ).toArray( function( err, items ) {
        if( items.length > 0 ) {
          res.send( 200, items );
        } else {
          res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Database is empty' } );
        }
      } );
    },

    create: function( req, res ) {
      var request = req.body;

      if( request.title && request.description && request.author && request.category && request.tags ) {
        db.collection( 'books' ).save( {
          _id: request.title,
          title: request.title,
          description: request.description,
          author: request.author,
          category: request.category,
					tags: request.tags
        } );
				
      for( var i = 0; i < request.tags.length; i++ ) {
          db.collection( 'tags' ).find( title : request.tags[i] ).toArray( function( err, items ) {
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
        }						
      }

        res.send( 201, { 'status': 'ok', 'code': '201', 'description': 'Book ' + request.title + ' now available on /books/' + request.title } );

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

    view: function( req, res ) {
      db.collection( 'books' ).find( { 'title' : req.params[ 'name' ] } ).toArray( function( err, items ) {

        if( items.length > 0 ) {
          res.send( 200, items );
        } else {
          res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Author not found' } );
        }

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
          db.collection( 'tags' ).find( title : request.tags[i] ).toArray( function( err, items ) {
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
          }						
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
          db.collection( 'tags' ).find( title : tags[i] ).toArray( function( err, items ) {
            if( items.length > 0 ) {
              db.collection( 'tags' ).update( { 
                title: tags[i]
              }, {
                $inc: { books : -1 }
              } );
            }
          }	);
        }
      }

        res.send( 201, { 'status': 'ok', 'code': '200', 'description': 'Book ' + title + ' removed' } );
      } else if( !title ) {
        res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Missed title or id' } );
      }
    }
  }
}