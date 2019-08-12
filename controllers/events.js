var models = require('../models');

exports.list = function(req, res) {
    models.event.findAll().then(function(result) {
        if (result) {
            res.send({
                message: "Success",
                data: result
            });
        } else {
            res.send("location not found");
        }
    })
}

exports.getOne = function(req, res) {
    models.event.findOne({
        attributes: ['id', 'name', 'start', 'end'],
        where: {
            id: req.params.id
        },
        include: [
            {
                attributes: ['id', 'name', 'city', 'address', 'province', 'longitude', 'latitude'],
                model: models.location
            },
            {
                attributes: ['id', 'name', 'type', 'price', 'openSeat', 'availableSeat'],
                model: models.ticket
            }
        ]
    }).then(function (result) {
        res.send({
            message: "Success",
            data: result
        })
    })
}

exports.create = function(req, res) {
    models.event.create({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        locationId: req.params.id
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
    models.event.update(
        req.body,
        {where: {id: req.params.id} }
    )
    .then(function(result) {
        models.event.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            if(result === null) {
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