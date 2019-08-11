let _ = require('lodash');
let uuid = require('short-uuid');

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

exports.create = async function(req, res) {
    var generatorId = uuid();

    await asyncForEach(req.body, async function(value) {
        var ticket = await models.ticket.findOne({
            where: {
                id: value.ticketId
            }})
        
        var price = ticket.dataValues.price;
        var availableSeat = ticket.dataValues.availableSeat;
        value.currentSeat = availableSeat - value.qty;

        if(value.currentSeat < 0) {
            console.log('Seat not available');
        }

        value.id = await generatorId.uuid();
        value.totalPrice = await price * value.qty;
        
    });

    var totalOrder = _.sumBy(req.body, function(o) { return o.totalPrice; })
    
    models.transaction.create({
        id: generatorId.generate(),
        totalOrder: totalOrder,
        status: "Awaiting Payment"
    }).then(async function (result) {
        await asyncForEach(req.body, async function(value) {
            models.transactionDetail.create({
                id: value.id,
                transactionId: result.get('id'),
                ticketId: value.ticketId,
                qty: value.qty,
                totalPrice: value.totalPrice
            }).then(function (result) {
                models.ticket.update(
                    {availableSeat: value.currentSeat},
                    {where: {id: value.ticketId } }
                )
            });
        });

        res.json({
            id: result.get('id'),
            transactionDetail: req.body
        })
    })
}

exports.purchase = async function(req, res) {
    models.transaction.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        if(req.body.purchaseAmount < result.dataValues.totalOrder) {
            res.send({
                message: "Payment rejected, purchase amount is less than total order"
            })
        } else if(result.status == "Purchases") {
            res.send({
                message: "Payment rejected, order already paid"
            })
        }
        else {
            result.status = "Purchases";
            result.save();
            res.send(result);
        }
    })
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}
