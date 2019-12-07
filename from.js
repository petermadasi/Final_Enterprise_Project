const express = require('express')
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
var urlencodedParser =bodyParser.urlencoded({ extended: true });
app.use(express.json());
app.use(express.static('./html_data'))




app.get('/show',(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("Project");
		dbo.collection('student').find({}).toArray(function(err, result)
		{
			if (err) throw err;
          var show = '<html><header><title>COllection</title></header><body>';
          show += '<table border="1"><tr><td><b>' + 'Name' + '</b></td><td><b>' + 'AGE' + '</b></td><td><b>' + 'ADDRESS' + '</b></td><td><b>' + 'DOB' + '</b></td><td><b>' + 'EDIT' + '</b></td><td><b>'+ 'DELETE' + '</b></td></tr>';
            result.forEach(function(results){
							console.log(results.name);
            show += '<tr><td><input type="text" value='+results.name+' name="name" ></td><td><input type="text" value='+results.age+' name="age" ></td><td><input type="text" value='+results.address+' name="address" ></td><td><input type="text" value='+results.DOB+' name="DBO" ></td><td><a href="\/update">Update</a></td><td><a href="\/delete">Delete</a></td></tr>';
          });

					show += "<a href='/insert'>Click to enter values in to DB</a>";
          show += '</table></body></html>'

		  res.send(show);
		  console.log(results.name);
			db.close();
		});
	});
});


app.get('/insert', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/thank'  method='post' name='form1'>";
  html += "<input type='text'  name='name' >";
  html += "<input type='text'  name='age' >";
  html += "<input type='text'  name='address' >";
  html += "<input type='text'  name='DOB' >";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

app.post('/thank', urlencodedParser,(req,res)=>{
	var MongoClient = mongodb.MongoClient;
	var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
	{
		if (err) throw err;
		var dbo = db.db("Project");

		console.log(req.body.name);
		console.log(req.body.age);
		console.log(req.body.address);
		console.log(req.body.DOB);
		var doc = {name:req.body.name,
        				age:req.body.age,
        				address:req.body.address,
        				DOB:req.body.DOB};
		dbo.collection('student').insert(doc,function(err, result)
		{
			if (err) throw err
			//res.send(err);

			res.send("Data is inserted to menu");

			db.close();

		});

	});

});

app.put('/update', (req,res) =>{
	console.log(name);
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Project");
		string a= req.body.name;
		int nb= req.body.age;
		string c= req.body.address;
		string d= req.body.DOB;
		var myquery = { name:"\'a\'"};
	var newvalues = { $set: {age : "\'b\'", address : "\'c\'" ,DOB : "\'d\'"} };
dbo.collection("student").updateOne(myquery, newvalues, function(err, result) {
	if (err) throw err;
	console.log("1 document updated");
		db.close();
	});
	console.log(req.body.name);
	dbo.collection("student").find({name: req.body.name}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result)
		db.close();
	});
});
});



app.delete('/delete', (req,res) =>{
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Project");
		var v= req.body.name;
		var myquery = { name :v};
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



const port = process.env.PORT || 8008;
app.listen(port, () => console.log('Listening on port ${port}..'));
