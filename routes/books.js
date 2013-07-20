
/*
 * GET books listing.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mOU159SE',
  database : 'books',
}); 
 
exports.list = function(req, res){
  res.render('books');
};

exports.view = function(req, res){
  res.render('books');
};

connection.connect();

var sql = 'SELECT * FROM books';
connection.query(sql, function(err, results) {
	console.log(results);
});

connection.end();