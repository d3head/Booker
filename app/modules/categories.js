// /*
//  * Categories
//  */
// exports.list = function(req, res){
// 	res.send(200, 'Categories');

// 	db.collection('books').find().toArray(function(err, items) {});
// };

// exports.view = function(req, res){
// 	res.send(200, 'Categories');

// 	db.collection('books').find({'category' : req.params[0]});
// };

/*
 * Categories
 */
module.exports = function( db ) {
  return {
    list: function( req, res ){
      res.send(200, 'Categories');

      db.collection('books').find().toArray(function(err, items) {});
    },

    view: function( req, res ){
      db.collection('books').find({'author' : req.params[0]}).toArray(function(err, items) {
        res.send(200, 'Categories' + items);
      }); 
    },
  }
}
