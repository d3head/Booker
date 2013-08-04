/*
 * Authors
 */
module.exports = function( db ) {
  return {
    list: function( req, res ) {
      db.collection( 'books' ).distinct( 'author', {}, function( err, items ) {
        if( items.length > 0 ) {
          res.send( 200, items );
        } else {
          res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Database is empty' } );
        }
      } );
    },
    
    view: function( req, res ) {
      db.collection( 'books' ).find( { 'author' : req.params[ 'name' ] } ).toArray( function( err, items ) {

        if( items.length > 0 ) {
          res.send( 200, items );
        } else {
          res.send( 400, { 'status': 'error', 'code': '400', 'description': 'Author not found' } );
        }

      } );
    }, 
  }
}