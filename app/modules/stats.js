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
          
          db.collection( 'books' ).distinct( 'author', {}, function( err, count ) {
            result.authors = count.length;
            
            db.collection( 'tags' ).count( function( err, count ) {
              result.tags = count;
              
              res.send( 200, result );
            } );
          } );
        } );
      } );
    }
  }
}