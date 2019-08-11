var express = require('express');
var router = express.Router();

var event = require('../controllers/events');

router.get('/', event.list);
router.get('/:id', event.getOne);
router.post('/:id', event.create);
router.put('/:id', event.update);

module.exports = router;