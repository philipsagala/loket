var models = require('../models');

exports.list = function(req, res) {
    models.ticket.findAll().then(function(result) {
        if (result !== null) {
            res.json({
                result: "Ticket not found"
            })
        } else {
            res.send(result);
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
    console.log(req.params.id)
    models.ticket.create({
        eventId: req.params.id,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        availableSeat: req.body.availableSeat
    }).then(function (result) {
      res.json({
          id: result.get('id')
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
                res.json({
                    result: "Nothing to update data not found"
                })
            } else {
                res.json({
                    result: "Update was successful",
                    data: result
                })
            }
        }) 
    })
}