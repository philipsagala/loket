var express = require('express');
var router = express.Router();

var location = require('../controllers/locations');

router.get('/', location.list);
router.get('/:id', location.getOne);
router.post('/', location.create);
router.put('/:id', location.update);

module.exports = router;