var models = require('../models');

exports.list = function(req, res) {
    models.event.findAll().then(function(result) {
        if (result) {
            res.send(result);
        } else {
            res.send("location not found");
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
    models.event.create({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        locationId: req.params.id
    }).then(function (result) {
      res.json({
          id: result.get('id')
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