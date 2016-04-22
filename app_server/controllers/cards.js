var request = require('request');
var apiOptions = {server : "http://localhost:3000"};

  if (process.env.NODE_ENV == 'production'){
    apiOptions.server = "https://trapoints-demo-2016.herokuapp.com";
  }

//The card list
  var renderCardList = function(req, res, responseBody){
  	res.render('card-list', { 
      title: 'Active Cards',
      pageHeader: {
        title: 'Active Cards',  
      },
      cards: responseBody 
     });	
  };


module.exports.cardList = function(req, res){
  var requestOptions, path;
  path = '/api/cards';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request(requestOptions, function(err, response, body){
    renderCardList(req, res, body);
  });
}


var renderCardDetails = function(req, res, responseBody){
  var cardDetails = responseBody[0];
	res.render('card-detail', { 
    title: 'Card Details',
    pageHeader: {
      title: 'Card Details'
    },
    cardNumber: cardDetails.cardNumber,
    points: cardDetails.points,
    historys: cardDetails.cardHistory
   });	
};


module.exports.cardDetails = function(req, res){
  var requestOptions, path;
  path = '/api/cards/' + req.params.cardNumber;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request(requestOptions, function(err, response, body){
    renderCardDetails(req, res, body);
  });
}

module.exports.getCardNew = function(req, res){
  var requestOptions, path;
  path = '/api/cards';
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : {},
  };
  request(requestOptions, function(err, response, body){
    var newBody = [body];
    renderCardList(req, res, newBody);
  });
}

module.exports.cardUpdate = function(req, res){
  var requestOptions, path;
  path = '/api/cards/' + req.params.cardNumber;
  requestOptions = {
    url : apiOptions.server + path,
    method : "PUT",
    json : {"points" : req.body.points}
  };
  request(requestOptions, function(err, response, body){
    var newBody = [body];
    renderCardDetails(req, res, newBody);
  });
}

module.exports.cardDelete = function(req, res){
  var requestOptions, path;
  path = '/api/cards/' + req.params.cardNumber;
  requestOptions = {
    url : apiOptions.server + path,
    method : "DELETE",
    json : {}
  };
  request(requestOptions, function(err, response){
  	res.render('about', { 
      title: 'About TraPoints',
      pageHeader: {
        title: 'TraPoints',
      }
     });	
  });
}
