const mongoose = require("mongoose");
const User = require("./user");
const Review = require("./review")

const listingSchema = new mongoose.Schema({
    image :{
        url :{type : String , required : true},
        filename :{type : String , default : 'poster'}
    },
    review :[{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Review'
    }],
    admin :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    director :{
        type : String,
        required : true 
    },
    writer :{
        type : String,
        required : true 
    },
    cast :[{
        type : String,
        required : true 
    }],
    year :{
        type : Number,
        required : true
    },
    duration :{
        type : Number,
        required : true
    },
    rating :{
        type : String,
        max : 5
    }
    
});

const List = new mongoose.model('List' , listingSchema);
module.exports= List;