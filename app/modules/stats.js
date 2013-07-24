/*
 * Stats
 */
var utils = require( './utils' );;
// utils.unique()
 
module.exports = function( db ) {
  return {
    get: function( req, res ) {
      db.collection( 'books' ).count( function( err, count ) {
        var result = { },
            today = new Date();
            
        result.books = count;
        
        db.collection( 'books' ).find( { 'added': today } ).count( function( err, count ) {
          result.addedToday = count;
          
          db.runCommand ( { distinct: "books", key: "authors" } ).count( function( err, count ) {
            result.authors = count;
            
            res.send( 200, result );
          } );
        } );
      } );
    }
  }
}