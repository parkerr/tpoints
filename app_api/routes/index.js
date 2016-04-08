var express = require('express');
var router = express.Router();
var ctrlCards = require('../controllers/cards');


/* Card Pages. */
router.get('/cards', ctrlCards.cardList);
router.post('/cards', ctrlCards.cardCreate)
router.get('/cards/:cardNumber', ctrlCards.cardReadOne);
router.put('/cards/:cardNumber', ctrlCards.cardUpdateOne);
router.delete('/cards/:cardNumber', ctrlCards.cardDeleteOne);


module.exports = router;