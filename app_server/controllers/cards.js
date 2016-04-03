module.exports.cardList = function(req, res){
	res.render('card-list', { title: 'Cards' });	
}

module.exports.cardDetails = function(req, res){
	res.render('card-detail', { title: 'Card Details' });	
}

module.exports.cardNew = function(req, res){
	res.render('card-new', { title: 'New Card' });	
}

module.exports.cardUpdate = function(req, res){
	res.render('card-update', { title: 'Update Card' });	
}