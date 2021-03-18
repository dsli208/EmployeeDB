//import { defaultMaxListeners } from "node:events";
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001;
var path = require('path');
var fs = require('fs')
var https = require('https')
var cors = require('cors')

app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
app.use(express.json());
app.use(cors());

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    assert = require('assert'),
    GridFSBucket = require('mongodb').GridFSBucket;

var url = "mongodb://localhost:27017/";
var mongodb;
var empdb;
var grid;

// Create DB and it's associated collections
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // Create database
    mongodb = db;
    empdb = mongodb.db("employeedb");
    console.log("Database created!");

    empdb.createCollection("test", function(err, res) {
        if (err) throw err;
        console.log("Test collection created!");
        //db.close();
      });
  
    // Create collections for Employee
    empdb.createCollection("employees", function(err, res) {
      if (err) throw err;
      console.log("Employees collection created!");
      //db.close();
    });
  
  });

app.get('/test', (req, res) => {
    var test_collection = empdb.collection("test");
    test_collection.insertOne({"1": 1, "2": 2});

    res.send(200);
    //res.end("Hello");
})

app.post('/add', (req, res) => {
    const add_func = async function(req, res) {
        try {
            console.log(req.body); 
            var first_name = req.body.first_name; console.log(first_name);
            var last_name = req.body.last_name;
            var email = req.body.email;
            var age = req.body.age;
            var dept = req.body.department;
            var phone = req.body.phone;
            var location = req.body.location;
            console.log(dept);

            var new_employee_obj = {"First Name": first_name, "Last Name": last_name, "Email": email, "Age": age, "Department": dept, "Phone Number": phone, "Location": location};
            var emp_collection = empdb.collection("employees");
            emp_collection.insertOne(new_employee_obj);

            console.log("Successfully added " + first_name + " " + last_name + " to the database");
            res.send(200, {"status": "OK"});
        }
        catch (e) {
            console.log(e);
            res.send(403, {"status": "error", "error": e});
          }
    }

    add_func(req, res);
});

app.get('/employees', (req, res) => {
    const list_employees = async function(req, res) {
        try {
            var emp_collection = empdb.collection("employees");
            var result = await emp_collection.find({}).toArray(); 
            if (result == null) {
                console.log("Nothing found");
                res.send(403, {"status": "error", "error": "No employee exists with this ID"});
            }
            else {
                res.send(200, result);
            }  
        }
        catch (e) {
            //console.log(e);
            res.send(400, {"error": e});
        }
    }
    list_employees(req, res);
})

app.get('/user/:id', (req, res) => {
    const get_employee = async function(req, res) {
        try {
            var id = req.params.id;
            console.log(id);
            var emp_collection = empdb.collection("employees");
            var result = await emp_collection.findOne({"_id": ObjectID(id)});
            if (result == null) {
                console.log("Nothing found");
                res.send(403, {"status": "error", "error": "No employee exists with this ID"});
            }
            else {
                console.log(result);
                res.send(200, {"employee": result});
            }
        }
        catch (e) {
            console.log(e);
            res.send(400, {"error": e});
        }
    }
    get_employee(req, res);
})

app.delete('/user/:id', (req, res) => {
    const delete_employee = async function(req, res) {
        try {
            var id = req.params.id;
            var emp_collection = empdb.collection("employees");
            var result = emp_collection.findOne({"_id": id});

            if (result != null) {
                var result2 = await emp_collection.deleteOne({"_id": ObjectID(id)});
                console.log(result);
                res.send(200, {"employee": result});
            }
            else {
                console.log("Nothing found");
                res.send(403, {"status": "error", "error": "No employee exists with this ID"});
            }
        }
        catch (e) {
            console.log(e);
            res.send(400, {"error": e});
        }
    }
    delete_employee(req, res);
})

app.post('/user/:id/update', (req, res) => {
    const update_employee = async function(req, res) {
        try {
            var first_name = req.body.first_name; console.log(first_name);
            var last_name = req.body.last_name;
            var email = req.body.email;
            var age = req.body.age;
            var id = req.params.id;
            var dept = req.body.department;
            var phone = req.body.phone;
            var location = req.body.location;
            console.log(dept);

            var new_employee_dict = {$set: {"First Name": first_name, "Last Name": last_name, "Email": email, "Age": age, "Department": dept, "Phone Number": phone, "Location": location}};

            var emp_collection = empdb.collection("employees");
            var result = await emp_collection.updateOne({"_id": ObjectID(id)}, new_employee_dict);
            if (result == null) {
                console.log("Nothing found");
                res.send(403, {"status": "error", "error": "No employee exists with this ID"});
            }
            else {
                console.log("Error");
                console.log(result);
                res.send(200, {"employee": result});
            }
        }
        catch (e) {
            //console.log(e);
            res.send(400, {"error": e});
        }
    }
    update_employee(req, res);
})

//export{};

/*https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
})*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))