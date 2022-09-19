const mongoose = require("mongoose");


const businessSchema = new mongoose.Schema({

    businessName: {
        type: String,
        required: true,
        minlength: 2

    },
    businessDescription: {
        type: String,
        required: true,
        minlength: 2,
        
    },
    businessAddress: {
        type: String,
        required: true,
        minlength: 2,
    },

     businessPhone: {
        type: String,
        required: true,
        minlength: 0,
    },

     image: {
        type: String,
        required: true,
        minlength: 2,
       
    },

    bizNumber:{
        type: Number
    },

    userId:{
        type: String
    },
    
});




const Card = mongoose.model("card", businessSchema) 
module.exports = Card;