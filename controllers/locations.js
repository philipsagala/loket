var models = require('../models');

exports.list = function(req, res) {
    models.location.findAll().then(function(result) {
        if (result) {
            res.send({
                message: "Success",
                data: result
            });
        } else {
            res.send({
                message: "Location not found"
            });
        }
    })
}

exports.getOne = function(req, res) {
    models.location.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.send({
            message: "Success",
            data: result
        });
    })
}

exports.create = function(req, res) {
    models.location.create({
        name: req.body.name,
        city: req.body.city,
        province: req.body.province,
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
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
    models.location.update(
        req.body,
        {where: {id: req.params.id} }
    )
    .then(function(result) {
        models.location.findOne({
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