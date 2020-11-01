const { userInfo } = require('os');

var globalVar;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function createCollection(name)
{
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
  dbo.createCollection(name, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 
}

function populateCollectionUsers()
{

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
  var myobj = [
    { name: 'John',password:'1234', address: 'Highway 71', email:"John@gmail.com", budget:"100"},
    { name: 'Peter',password:'1234', address: 'Lowstreet 4', email:"Peter@gmail.com", budget:"1040"},
    { name: 'Amy',password:'1234', address: 'Apple st 652', email:"Amy@gmail.com", budget:"130"},
    { name: 'Hannah',password:'1234', address: 'Mountain 21', email:"Hannah@gmail.com", budget:"120"},
  ];
  dbo.collection('users').insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
}); 


}
//var x =2 






function populateCollectionProducts()
{
    
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("appdb");
    var myobj = [
      { denumire: 'Banana'},
      { denumire: 'Apa'},
      { denumire: 'Mezeluri'},
      { denumire: 'Suc'}
    ];
    dbo.collection('products').insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  }); 
  
}
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//     dbo.collection("users").drop(function(err, delOK) {
//       if (err) throw err;
//       if (delOK) console.log("Collection deleted");
//       db.close();
//     });
//   }); 

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//     dbo.collection("buyings").drop(function(err, delOK) {
//       if (err) throw err;
//       if (delOK) console.log("Collection deleted");
//       db.close();
//     });
//   }); 

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("appdb");
//     dbo.collection("products").drop(function(err, delOK) {
//       if (err) throw err;
//       if (delOK) console.log("Collection deleted");
//       db.close();
//     });
//   }); 



//createCollection("users");
// createCollection("products")
// createCollection("buyings");
// populateCollectionUsers();
// populateCollectionProducts();



function populateCollectionBuyings()
{

MongoClient.connect(url,{poolSize: 10, bufferMaxEntries: 0, reconnectTries: 5000, useNewUrlParser: true,useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("appdb");
  var query = { email:'John@gmail.com' };
  return dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    var query2 = {denumire : "Banana"};
    // dbo.collection("products").find(query2).toArray(function (err, result2){
    //     console.log(result);
    //     console.log(result2);
    //     var myobj = [
    //         {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "1", price:"3", quantity:"5"},
    //         {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "2", price:"2", quantity:"3"},
    //         {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "3", price:"5", quantity:"2"},
    //         {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "4", price:"4", quantity:"5"},
    //         {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "5", price:"3", quantity:"2"},   
    //     ]
    //     console.log(myobj);
    //     dbo.collection('buyings').insertMany(myobj, function(err, res) {
    //         if (err) throw err;
    //         console.log("Number of documents inserted: " + res.insertedCount);
    //         db.close();
    //       });
    // });
    query2 = {denumire : "Apa"};
    return dbo.collection("products").find(query2).toArray(function (err, result2){
        //console.log(result);
        //console.log(result2);
        var myobj = [
            {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "1", price:"3", quantity:"5"},
            {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "2", price:"2", quantity:"3"},
            {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "3", price:"5", quantity:"2"},
            {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "4", price:"4", quantity:"5"},
            {id_user : result[0]._id, id_produs : result2[0]._id, timestamp : "5", price:"3", quantity:"2"},   
        ];
        //console.log(myobj);
        
        dbo.collection('buyings').insertMany(myobj, function(errr, ress) {
            if (errr) throw errr;
            console.log("Number of documents inserted: " + ress.insertedCount);
            db.close();
          });

        globalVar = myobj;
        //console.log(globalVar)
        return myobj;
    });
    //db.close();
    //console.log(result);
  });
}); 
}


async function stuff()
{
    let myobj =await populateCollectionBuyings();
}

stuff();


