var express = require('express');
var router = express.Router();
var ctrlCards = require('../controllers/cards');
var ctrlOthers = require('../controllers/others');


/* Other Pages. */
router.get('/', ctrlOthers.about);


/* Card Pages. */
router.get('/cards', ctrlCards.cardList);
router.get('/cards/:cardNumber', ctrlCards.cardDetails);
router.get('/cards/card/new', ctrlCards.cardNew);
router.get('/cards/card/update', ctrlCards.cardUpdate);


module.exports = router;
