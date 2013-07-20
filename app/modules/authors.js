/*
 * Authors
 */
module.exports = function( db ) {
  return {
    list: function( req, res ){
      db.collection('books').find().toArray(function(err, items) {
		res.send(200, items);
	  });
    },

    view: function( req, res ){
      /*db.collection('books').find({'author' : req.params[0]}).toArray(function(err, items) {
        res.send(200, items);
      }); */
	   res.send(200, req.params[0]);
    }, 
  }
}