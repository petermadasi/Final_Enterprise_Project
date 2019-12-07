const express=require('express');
const app = express();
app.use(express.json());


//1.GET Service for students
app.get('/project/get_coll',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Project");
  dbo.listCollections().toArray(function(err, collections) {
    if (err) throw err;
    console.log(collections);
res.send(collections);
    db.close();
  });
});
});


app.get('/project/get_student', (req,res,res1) => {
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
   MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("Project");
  dbo.collection("student").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	res.send(result)
    db.close();
		});
	});
});


//----------------------------------------------------------------



//2.POST Service for students
app.post('/project/post_student', (req,res) =>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Project");
		var myobj = [{name : "Gandhi",
			age : 45,
			address : "Jarvis",
			DOB: "01-02-1980"}]
	dbo.collection("student").insert(myobj, function(err, res) {
			if (err) throw err;
			console.log("one document inserted in student collection" + res.insertedCount);
			db.close();
	});
	dbo.collection("student").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result)
			db.close();
	
		});
	});
});

//----------------------------------------------------------------------

//3.PUT Service for students
app.put('/project/put_student', (req,res) =>{
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Project");
		var myquery = { name: "Vishnu" };
		var newvalues = { $set: {age : 30,address : "Toronto"} };
	dbo.collection("student").updateOne(myquery, newvalues, function(err, result) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
	});
	dbo.collection("student").find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result)
		db.close();
	});
});
});

//----------------------------------------------------------------------------


//4.DELETE Service for students
 
app.delete('/project/delete_student', (req,res) =>{
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Project");
		var myquery = { name : "Rayn" };
	dbo.collection("student").deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		db.close();
		});
	dbo.collection("student").find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result)
		db.close();
		});
	});
});



const port = process.env.PORT || 8081;
app.listen(port,()=>console.log('Listeing on port ${port}..'));
