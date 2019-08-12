var models = require('../models');

exports.list = function(req, res) {
    models.ticket.findAll().then(function(result) {
        if (result) {
            res.send({
                message: "Success",
                data: result
            });
        } else {
            res.send({
                message: "Ticket not found"
            })
        }
    })
}

exports.getOne = function(req, res) {
    models.event.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.send(result);
    })
}

exports.create = function(req, res) {
    models.ticket.create({
        eventId: req.params.id,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        openSeat: req.body.openSeat,
        availableSeat: req.body.openSeat
    }).then(function (result) {
      res.send({
            message: "Success",
            data: {
                id: result.get('id')
            }
      })
    })
}

exports.update = function(req, res) {
    models.ticket.update(
        req.body,
        {where: {id: req.params.id} }
    )
    .then(function(result) {
        models.ticket.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            if(result == null) {
                res.send({
                    message: "Nothing to update data not found"
                })
            } else {
                res.send({
                    message: "Update was successful",
                    data: result
                })
            }
        }) 
    })
}