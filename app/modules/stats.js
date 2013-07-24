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
          tags,
          books;

      db.collection( 'books' ).count( function( err, count ) {
        result.books = count;
      } );
      
      db.collection( 'books' ).find( { 'added': today} ).count( function( err, count ) {
        result.addedToday = count;
      } );

      console.log( result );
    }, 
  }
}