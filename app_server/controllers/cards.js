module.exports.cardList = function(req, res){
	res.render('card-list', { 
    title: 'Active Cards',
    pageHeader: {
      title: 'Active Cards',  
    },
    cards:[{
      cardNumber: '12345678910',
      points: 123
    },{
      cardNumber: '11111111111',
      points: 76
    },{
      cardNumber: '22222222222',
      points: 976
    }]  
   });	
}

module.exports.cardDetails = function(req, res){
	res.render('card-detail', { 
    title: 'Card Details',
    pageHeader: {
      title: 'Card Details'
    },
    cardNumber: '123456789',
    points: 765,
    historys: [{
      date: '01/01/2016',
      points: 37
    },{
      date: '01/02/2016',
      points: 12345
    }]
   });	
}

module.exports.cardNew = function(req, res){
	res.render('card-new', { title: 'New Card' });	
}

module.exports.cardUpdate = function(req, res){
	res.render('card-update', { title: 'Update Card' });	
}