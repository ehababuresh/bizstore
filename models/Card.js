const { number, string } = require("joi");
const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  bizname: {
    type: String,
    required: true,
    minlength: 2,
  },
  bizdescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  biznumber: {
    type: String,
    required: true,
    unique:true,
    min: 1,
  },
  bizadress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizphone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  
  bizimage: {
    type: String,
    required: true,
    minlength: 2,
  },
  userId: {
    type: String,
    
    required: true,
},
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
