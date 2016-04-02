module.exports.cardList = function(req, res){
	res.render('card-list', { title: 'Cards' });	
}

module.exports.cardDetails = function(req, res){
	res.render('index', { title: 'Card Details' });	
}

module.exports.cardNew = function(req, res){
	res.render('index', { title: 'New Card' });	
}

module.exports.cardUpdate = function(req, res){
	res.render('index', { title: 'Update Card' });	
}