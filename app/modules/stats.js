/*
 * Stats
 */
var utils = require( './utils' );;
// utils.unique()

module.exports = function( db ) {
  return {
    get: function( req, res ) {
		
			var added				= new Date(),
    			today				= db.collection( 'books' ).find( { 'added': added } ).count(),
    			books 			= db.collection( 'books' ).count(function(err, count){}),
    			authors 		= null,
    			tags				= null;
			
      res.send( 200, { 'today': today, 'books': books, 'authors': authors, 'tags': tags } );
    }, 
  }
}