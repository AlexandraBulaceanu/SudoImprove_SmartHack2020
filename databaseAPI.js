var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function gandalf(){
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) {
          reject(err);  
        } else {
          resolve(db);
        }        
      }
    )}).then(function(db) {
      return new Promise(function(resolve, reject) {
        var collection = db.collection('buying');
        
        collection.find({}).toArray(function(err, items) {
          if (err) {
            reject(err);
          } else {
            console.log(items);
            resolve(items);
          }          
        });
      });
    });
}

console.log(gandalf())

// function average_price(username, product_name)
// {
//     MongoClient.connect(url,{poolSize: 10} ,function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("appdb");
//         var query1 = { name: username };
//         var result5
//         result5 = dbo.collection("buyings").find({}).toArray(function arrr(err, result4)
//               {
//                 dbo.collection("users").find(query1).toArray(function(err, result1) {
//                     if (err) throw err;
//                     //console.log(result1)
//                     var query2 = {denumire : product_name}
//                     dbo.collection("products").find(query2).toArray(function (err, result2)
//                     {
//                         //console.log(result2[0]._id);
//                         var query3 = {id_user : result1[0]._id, id_produs : result2[0]._id}
//                         //console.log(query3)
//                         console.log("gandalf");
                        
//                     })
          
          
//                     db.close();
//                   });
                  
//                   //console.log(result4);
//                   result5 = result4;
//                     return result4;
//                 })
        
//       }); 

// }

// average_price("John", "Apa");