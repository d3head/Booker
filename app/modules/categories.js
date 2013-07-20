/*
 * Categories
 */
exports.list = function(req, res){
	res.send(200, 'Categories');

	db.collection('books').find().toArray(function(err, items) {});
};

exports.view = function(req, res){
	res.send(200, 'Categories');

	db.collection('books').find({'category' : req.params[0]});
};