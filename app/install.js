var MongoClient = require('mongodb').MongoClient
  , config = require('./config.json')
  , db = require('./modules/db.json');

MongoClient.connect('mongodb://' + config.db.server + ':' + config.db.port + '/' + config.db.db, function(err, db) {
  
} );

// {
//   "books": {
//     "id": id,
//     "title": title,
//     "description": description,
//     "picture": picture,
//     "link": link,
//     "author": author,
//     "category": category,
//     "date": date
//   },
//   "authors": {
//     "title": title,
//     "description": description,
//     "picture": picture
//   }
// }