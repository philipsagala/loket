var express = require('express');
var router = express.Router();

var transaction = require('../controllers/transaction');

router.get('/', transaction.list);
router.get('/:id', transaction.getOne);
router.post('/:id', transaction.create);

module.exports = router;