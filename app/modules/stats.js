/*
 * Stats
 */
module.exports = function( db ) {
  return {
    get: function( req, res ) {
		
			var added				= new Date();
			var today				= db.collection( 'books' ).find( { 'added': added } ).count();
			var books 			= db.collection( 'books' ).count(function(err, count){});
			var authors 		= null;
			var tags				= null;
			
      res.send( 200, { 'today': today, 'books': books, 'authors': authors, 'tags': tags } );
    }, 
  }
}