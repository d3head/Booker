// /*
//  * Books
//  */
// exports.list = function(req, res){
//   res.send(200, 'Books');
// };

// exports.create = function(req, res){
//   res.send(200, 'Books');
// };

// exports.view = function(req, res){
//   res.send(200, 'Books');
// };

// exports.edit = function(req, res){
//   res.send(200, 'Books');
// };

// exports.delete = function(req, res){
//   res.send(200, 'Books');
// };

/*
 * Books
 */
module.exports = function( db ) {
  return {
    list: function( req, res ) {
      res.send(200, 'Books');

      db.collection('books').find().toArray(function(err, items) {});
    },

    view: function( req, res ) {
      db.collection('books').find({'author' : req.params[0]}).toArray(function(err, items) {
        res.send(200, 'Books' + items);
      }); 
    }, 
  }
}
