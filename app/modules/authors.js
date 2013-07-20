/*
 * Authors
 */
module.exports = function( db ) {
  return {
    view: function( req, res ) {
      db.collection( 'books' ).find( { 'author' : req.params[ 'id' ] } ).toArray( function( err, items ) {
        if( typeof items[ 0 ] !== 'undefined' && items[ 0 ] !== null ) {
    			res.send( 200, items );
    		} else {
    			res.send( 400, { 'code': '400', 'description': 'Author not found' } );
    		}
      });
    }, 
  }
}