var express = require('express');
var router = express.Router();
const workedprojects = require("../public/arrayprojects/projects");
var loginStatus='';
/* GET home page. */
router.get('/', function(req, res, next) {
  
  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }
  
  res.render('home', { title: 'Home Page',active1:'active',active2:'',active3:'',active4:'',active5:'',active6:'',active7:'',loginStatus:loginStatus });

});

router.get('/aboutus', function(req, res, next) {
  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }
  res.render('page_aboutus', { title: 'Aboutus',active1:'',active2:'active',active3:'',active4:'',active5:'',active6:'',active7:'',loginStatus:loginStatus });
});

router.get('/contactus', function(req, res, next) {

  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }

  res.render('page_contactus', { title: 'Contactus ',active1:'',active2:'',active3:'active',active4:'',active5:'',active6:'',active7:'',loginStatus:loginStatus });
});

router.get('/projects', function(req, res, next) {

  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }

  res.render('page_projects', { title: 'Tested Projects', projects: workedprojects,active1:'',active2:'',active3:'',active4:'active',active5:'',active6:'',active7:'',loginStatus:loginStatus });
});

router.get('/projects/:slug', function(req, res, next) {

  myproject = projects.filter((e) => {
      return e.slug == req.params.slug;
  })

  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }

  res.render('page_ourprojects', { title: myproject[0].title, project: myproject[0],active1:'',active2:'',active3:'',active4:'active',active5:'',active6:'',active7:'',loginStatus:loginStatus });
});

router.get('/resumecv', function(req, res, next) {
  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }

  res.render('page_mycv', { title: 'My Resume',active1:'',active2:'',active3:'',active4:'',active5:'',active6:'active',active6:'',active7:'',loginStatus:loginStatus });
});

router.get('/services', function(req, res, next) {

  try {
    loginStatus=req.cookies['username'];
   } catch (err) {  
  }
  res.render('page_ourservices', { title: 'Services Pages',active1:'',active2:'',active3:'',active4:'',active5:'active',active6:'',active7:'',loginStatus:loginStatus });
});









module.exports = router;
