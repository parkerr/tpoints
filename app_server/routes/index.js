var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', homepageController);


var homepageController = function(req, res){
	res.render('index', { title: 'Express' });	
}

module.exports = router;
