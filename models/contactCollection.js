const mongoose = require('mongoose');


  const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    Contactno: {
        type: String,
        required: true,
        maxlength: 15,
        unique: true
    },
    EmailAddress: {
        type: String,
        required: true,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now
      }
    });

var contactCollection = mongoose.model("contactCollections", contactSchema);


const ContactOne = new contactCollection({ Name: 'Daman deep Singh',Contactno:'98154-27833',EmailAddress:'damandeepsingh@gmail.com' });
ContactOne.save(function (err) {
  
  // saved!
});

const ContactTwo = new contactCollection({ Name: 'Parminder Saini',Contactno:'98145-63033',EmailAddress:'suriredhat@gmail.com' });
ContactTwo.save(function (err) {
 
  // saved!
});

module.exports=contactCollection


