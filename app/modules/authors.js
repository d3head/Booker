/*
 * Authors
 */
<<<<<<< HEAD
exports.list = function(req, res){
	db.collection('books').find().toArray(function(err, items) {
		res.send(200, items);
	});
};

exports.view = function(req, res){
	db.collection('books').find({'author' : req.params[0]}).toArray(function(err, items) {
		res.send(200, items);
	});	
};
=======
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
>>>>>>> c501bb577cb78cb56b3e8d22dc1c5903d81292b4
