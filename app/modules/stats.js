/*
 * Stats
 */
var utils = require( './utils' );;
// utils.unique()

module.exports = function( db ) {
  return {
    get: function( req, res ) {
		
			var result = { },
          today = new Date(),
          addedToday,
          authors,
          tags;

      db.collection( 'books' ).count( function( err, count ) {
        result.books = count;
      } )

      console.log( result );
    }, 
  }
}