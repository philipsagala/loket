let _ = require('lodash');
let uuid = require('short-uuid');

var models = require('../models');

exports.list = function(req, res) {
    models.transaction.findAll().then(function(result) {
        if (result) {
            res.send({
                message: "Success",
                data: result
            });
        } else {
            res.send({
                message: "Transaction not found"
            });
        }
    })
}

exports.getOne = function(req, res) {
    models.transaction.findOne({
        attributes: ['id', 'totalOrder', 'status', 'createdAt', 'updatedAt'],
        where: {
            id: req.params.id
        },
        include: [
            {
                attributes: ['id', 'totalPrice', 'qty', 'createdAt', 'updatedAt'],
                model: models.transactionDetail,
                include: {
                    attributes: ['id', 'name', 'type', 'price', 'availableSeat'],
                    model: models.ticket
                }
            }
        ]
    }).then(function (result) {
        res.send(result);
    })
}

exports.create = async function(req, res) {
    var generatorId = uuid();
    var orderInvalid = {};
    var checkEvent = false;

    await asyncForEach(req.body, async function(value) {
        var ticket = await models.ticket.findOne({
            where: {
                id: value.ticketId
            },
            include: {
                model: models.event
            }});

        var price = ticket.dataValues.price;
        var availableSeat = ticket.dataValues.availableSeat;
        value.currentSeat = availableSeat - value.qty;

        if(value.currentSeat < 0) {
            orderInvalid.ticketId = await value.ticketId;
        }

        if(checkEvent != false && checkEvent != ticket.dataValues.event.dataValues.id){
            orderInvalid.message = "Request order invalid, Customer only can purchase ticket within same event.";
        }
        
        checkEvent = ticket.dataValues.event.dataValues.id;

        value.id = await generatorId.uuid();
        value.totalPrice = await price * value.qty;
        
    });

    if(isEmpty(orderInvalid)) {
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

            res.send({
                message: "Success",
                data: {
                    transactionId: result.get('id'),
                    transactionDetail: req.body
                }
            })
        })
    } else {
        if(orderInvalid.message) {
            res.send({
                message: orderInvalid.message
            })
        } else {
            res.send({
                message: "Request order invalid, Available seat is not available",
                data: orderInvalid
            })
        }
    }
}

exports.purchase = async function(req, res) {
    models.transaction.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        if(req.body.purchaseAmount < result.dataValues.totalOrder) {
            res.send({
                message: "Payment declined, payment amount is less than total order"
            })
        } else if(result.status == "Purchases") {
            res.send({
                message: "Payment declined, order already paid"
            })
        }
        else {
            result.status = "Purchases";
            result.save();
            res.send({
                message: "Success",
                data: result
            });
        }
    })
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
