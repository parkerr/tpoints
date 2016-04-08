var mongoose = require('mongoose');


var cardHistorySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  points: Number,
  department: String,
});


var cardSchema = new mongoose.Schema({
  cardNumber: Number,
  points: {type: Number, "default": 0, min: 0},
  email: String,
  cardHistory: [cardHistorySchema]  
});

mongoose.model('Card', cardSchema);