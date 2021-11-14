var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

const { UserCollectionTable } = require('../models/UserCollection');
const { contactCollectionTable } = require('../models/contactCollection');
var loginStatus='';
var MongoClient = require('mongodb').MongoClient
var SessionStore=null;
/* GET users listing. */

// var "mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority" = "mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority";

router.get('/login', function (req, res, next) {
  try {
    loginStatus=req.cookies['username'];
    
   } catch (err) {  
  }
  res.render('page_login', { title: 'Member Login',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',loginStatus:loginStatus,Message :'' });
});


router.get('/createcontact', function (req, res, next) {
  try {
    loginStatus=req.cookies['username'];
    if(loginStatus=="")
    {
      res.redirect("/users/login");
    }
   } catch (err) {  
  }
  res.render('page_businessContactSave', { title: 'Create Contact',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',loginStatus:loginStatus,Message :'' });
});

router.post('/createcontact', function (req, res, next) 
{
  
  try {
    loginStatus=req.cookies['username'];

    if(loginStatus=="")
    {
      res.redirect("/users/login");
    }

   } 
   catch (err) 
   {

    }
  
  MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) 
  {
    if (err) throw err;
    var dbo = db.db("damandeepdb");
    var newvalues = {Name:req.body.Name,Contactno:req.body.Mobile,EmailAddress:req.body.emailid };
    dbo.collection("contactcollections").insert(newvalues ,function(err, result) 
   
    {
        if (err) throw err;
       
       
        res.redirect("/users/contactListview");
        db.close();
        });    
    });
 });


 
router.post('/login', function (req, res, next) 
{
  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }

    var usernameInput= req.body.username
		var passwordInput = req.body.password;

    MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
      if (err) throw err;
      var dbo = db.db("damandeepdb");
      dbo.collection("usercollections").findOne({
          username: usernameInput
      }, 
      function(err, result) {
          if (err) throw err;
          if(result==null)
          {
              res.render('page_login', { title: 'Member Login',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',Message:'Incorrect Username',loginStatus:loginStatus });
          }
          else
          {

                  if (result.password != passwordInput) 
                  {
                      res.render('page_login', { title: 'Member Login',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',Message:'Incorrect Password',loginStatus:loginStatus });
                  }
                  else
                  {
                        res.cookie('username', usernameInput, { maxAge: 900000, httpOnly: true });
                        
                        res.redirect("/users/contactListview");
                  }
          }

          db.close();
      });
   });
        
  });
  
  router.get('/contactListview', function (req, res, next) {

    try {
      loginStatus=req.cookies['username'];
      
      if(loginStatus=="")
    {
      res.redirect("/users/login");
    }
     } catch (err) {  
    }

    var resultall;
    MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
      if (err) throw err;
      var dbo = db.db("damandeepdb");
      //Sort the result by name:
      var sort = { Name: 1 };
      dbo.collection("contactcollections").find().sort(sort).toArray(function(err, result) {
        
        if (err) throw err;
        res.render('page_businessContactlist', { title: 'Business Contact Lists',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',loginStatus:loginStatus,datacontact:result });
 
        db.close();
      });
    });

  });

  router.get('/update/:id', function (req, res, next) 
  {
    
    try {
      loginStatus=req.cookies['username'];

     } catch (err) { }
    
    MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) 
    {
      if (err) throw err;
      var dbo = db.db("damandeepdb");
      
      dbo.collection("contactcollections").findOne({ _id: new mongodb.ObjectID(req.params.id) }, function(err, result) 
     
      {
          if (err) throw err;
         
          res.render('page_businessContactEdit', { title: 'Business Contact Lists',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'active',loginStatus:loginStatus,datacontact:result });
 
          //res.redirect("/users/contactListview");
          db.close();
          });    
      });
   });



  router.post('/update/:id', function (req, res, next) 
  {
    
    try {
      loginStatus=req.cookies['username'];

     } catch (err) { }
    
    MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) 
    {
      if (err) throw err;
      var dbo = db.db("damandeepdb");
      var newvalues = { $set: {Name:req.body.Name,Contactno:req.body.Mobile,EmailAddress:req.body.emailid} };
      dbo.collection("contactcollections").updateOne({ _id: new mongodb.ObjectID(req.params.id) },newvalues ,function(err, result) 
     
      {
          if (err) throw err;
         
         
          res.redirect("/users/contactListview");
          db.close();
          });    
      });
   });




  router.get('/delete/:id', function (req, res, next) {
    
    try {
      loginStatus=req.cookies['username'];
     } catch (err) {  
    }
    
    MongoClient.connect("mongodb+srv://dsing521:abcdefgh@cluster0.hs816.mongodb.net/?retryWrites=true&w=majority", function(err, db) {
      if (err) throw err;
      var dbo = db.db("damandeepdb");
   
    
    dbo.collection("contactcollections").deleteOne({ _id: new mongodb.ObjectID(req.params.id) }, function(err, obj) {
      if (err) throw err;
      res.redirect("/users/contactListview");
      db.close();
    });
  });
});


    router.get('/logout', function (req, res, next) {
      //console.log(req.cookies['username']);
      res.cookie('username', '', { maxAge: 900000, httpOnly: true });
      res.redirect("/");
    
  });

module.exports = router
