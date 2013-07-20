/*
 * Authors
 */
module.exports = function( db ) {
  return {
    list: function( req, res ){
      res.send(200, 'Authors');

      db.collection('books').find().toArray(function(err, items) {});
    },

    view: function( req, res ){
      db.collection('books').find({'author' : req.params[0]}).toArray(function(err, items) {
        res.send(200, 'Authors' + items);
      }); 
    }, 
  }
}