var models = require('../models');

exports.list = function(req, res) {
    models.location.findAll().then(function(result) {
        if (result) {
            res.send(result);
        } else {
            res.send("location not found");
        }
    })
}

exports.getOne = function(req, res) {
    models.location.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.send(result);
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
      res.json({
          id: result.get('id')
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