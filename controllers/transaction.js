var models = require('../models');

exports.list = function(req, res) {
    models.transaction.findAll().then(function(result) {
        if (result) {
            res.send(result);
        } else {
            res.send("transaction not found");
        }
    })
}

exports.getOne = function(req, res) {
    models.transaction.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.send(result);
    })
}

exports.create = function(req, res) {
    // models.transaction.create({
    //     eventId: req.params.id,
    //     name: req.body.name,
    //     type: req.body.type,
    //     price: req.body.price,
    //     availableSeat: req.body.availableSeat
    // }).then(function (result) {
    //   res.json({
    //       id: result.get('id')
    //   })
    // })
}