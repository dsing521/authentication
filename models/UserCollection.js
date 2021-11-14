const mongoose = require('mongoose');


const userrSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    emailaddress: {
        type: String,
        required: true,
        maxlength: 70,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    date: {
        type: Date,
        default: Date.now
      }
    });
var userCollection = mongoose.model("userCollections", userrSchema);

const AccountOne = new userCollection({ username: 'damandeep007',password:'ddd111',emailaddress:'dsing521@my.centennialcollege.ca' });
AccountOne.save(function (err) {
  
});

const AccountTwo = new userCollection({ username: 'suriredhat',password:'111111',emailaddress:'suriredhat@gmail.com' });
AccountTwo.save(function (err) {
 
});

module.exports=userCollection


