var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function average_price(username, product_name)
{


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("appdb");
        var query1 = { name: username };
        dbo.collection("users").find(query1).toArray(function(err, result1) {
          if (err) throw err;
          //console.log(result1)
          var query2 = {denumire : product_name}
          dbo.collection("products").find(query2).toArray(function (err, result2)
          {
              //console.log(result2[0]._id);
              var query3 = {id_user : result1[0]._id, id_produs : result2[0]._id}
              //console.log(query3)
              dbo.collection("buyings").find({}).toArray(function (err, result4)
              {
                  console.log(result4);
              })
          })


          db.close();
        });
      }); 

}

average_price("John", "Banana");