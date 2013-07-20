/*
 * Authors
 */
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