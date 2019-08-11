var express = require('express');
var router = express.Router();

var ticket = require('../controllers/tickets');

router.get('/', ticket.list);
router.get('/:id', ticket.getOne);
router.post('/:id', ticket.create);
router.put('/:id', ticket.update);

module.exports = router;