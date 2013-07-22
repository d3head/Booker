/*
 * Stats
 */
var utils = require( './utils' );;
// utils.unique()

module.exports = function( db ) {
  return {
    get: function( req, res ) {
		
			var added				= new Date(),
          books,
          authors,
          tags;
    		  //	today				= db.collection( 'books' ).find( { 'added': added } ),    			

      db.collection( 'books' ).count( function( err, count ) {
        books = count;

        res.send( 200, { /* 'today': today, */ 'books': books, 'authors': authors, 'tags': tags } );
      } )
    }, 
  }
}