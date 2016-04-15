var mongoose = require('mongoose');
var Cards = mongoose.model('Card');


var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};


module.exports.cardList = function(req, res){
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.cardReadOne = function(req, res){
  //Cards.findById(req.params.cardNumber).exec(function(err, card){
    Cards.find({cardNumber : req.params.cardNumber}).exec(function(err, card){
    sendJsonResponse(res, 200, card);
  })
};