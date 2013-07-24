/*
 * Stats
 */
var utils = require( './utils' );;
// utils.unique()
 
module.exports = function( db ) {
  return {
    get: function( req, res ) {
      db.books.count( function( err, count ) {
        var result = { },
            today = new Date();
            
        result.books = count;
        
        db.books.find( { 'added': today } ).count( function( err, count ) {
          result.addedToday = count;
          
          db.books.distinct( 'author' ).count( function( err, count ) {
            result.authors = count;
            
            res.send( 200, result );
          } );
        } );
      } );
    }
  }
}