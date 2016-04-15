var mongoose = require('mongoose');
var Cards = mongoose.model('Card');


var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
};

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

// Some helper functions for creating new cards
var cardCreate = function(req, res, newCard){
     Cards.create({
       cardNumber: newCard,
       email: req.body.email,
       points: 0,
       cardHistory:[{
         points: 0
       }]
     }, function(err, card){
       if(err){
         sendJsonResponse(res, 404, err);
       } else {
         sendJsonResponse(res, 200, card);
       }
     });  
   };   
  
//Get a random 16 digit number. If it already exists then
// try another recursively 
var getCardNumber = function(req, res){
    var newCard = randomFixedInteger(16);
     Cards.find({cardNumber : newCard}).exec(function(err, card){
        if(!card.length){
          getCardNumber(req, res);
        } else {
          cardCreate(req, res, newCard);
          return
        }});
    };

    var updatePoints = function(req, res, card){
      if(!card){
        sendJsonResponse(res, 404, {"message" : "no card number in request"});
      } else {
        card.cardHistory.push({
          points: req.body.points,
          department: req.department
        })
      card.save(function(err, card){
        if(err){
          sendJsonResponse(res, 404, err);
        } else {
          updateTotalPoints(card._id, res);
        }
      });
      }
    };

    var updateTotalPoints = function(cardid, res){
      Cards.findById(cardid).exec(function(err, card){
        if(!err){
          doSetTotalPoints(card, res);
        }
      });
    };

    var doSetTotalPoints = function(card, res){
      var i, totalPoints;
      totalPoints = 0;
      if(card.cardHistory && card.cardHistory.length > 0){
        for(i = 0; i < card.cardHistory.length; i++){
           console.log(card.cardHistory[i].points);
          totalPoints = totalPoints + card.cardHistory[i].points;
        }
        card.points = totalPoints;
          console.log(totalPoints);
        
        card.save(function(err, card){
          if(err){
            console.log(err);
          }else{
            console.log("Points Updated")
            sendJsonResponse(res, 200, card);
          }
        });

      }
    };



module.exports.cardCreate = function(req, res){
  var newCard = randomFixedInteger(16);
   Cards.find({cardNumber : newCard}).exec(function(err, card){
      if(!card.length){
        cardCreate(req, res, newCard);
      } else {
        getCardNumber(req, res);
        return
      }});

};





module.exports.cardList = function(req, res){
  Cards.find().select('cardNumber points').exec(function(err, card){
    
    if(!card.length){
      
      sendJsonResponse(res, 404, {"message" : "card number not found"});
      return
      
    } else if(err){
      
      sendJsonResponse(res, 404, err);
      return
    }
    sendJsonResponse(res, 200, card);
  });
  
};

module.exports.cardReadOne = function(req, res){
  if (req.params && req.params.cardNumber){
    
    Cards.find({cardNumber : req.params.cardNumber}).exec(function(err, card){
      if(!card.length){
        
        sendJsonResponse(res, 404, {"message" : "card number not found"});
        return
        
      } else if(err){
        
        sendJsonResponse(res, 404, err);
        return
      }
      sendJsonResponse(res, 200, card);
    });
  } else {
    sendJsonResponse(res, 404, {"message" : "no card number in request"});
  }    
};

module.exports.cardUpdateOne = function(req, res){

  Cards.find({cardNumber : req.params.cardNumber}).exec(function(err, card){
    var card2 = card[0];
   
    if(card2.length == 0){
      
      sendJsonResponse(res, 404, {"message" : "card number not found"});
      return
      
    } else if(err){
      
      sendJsonResponse(res, 404, err);
      return
    }
    if(!req.body.points && req.body.email){
      card2.email = req.body.email;
      card2.save(function(err, card){
        if(err){
          console.log(err);
        }else{
          console.log("Email Updated")
          sendJsonResponse(res, 200, card);
        }
      });
    } else {
      updatePoints(req, res, card2);
    }
     
    
  });
  
};


