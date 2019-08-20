const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('short-uuid');

const app = require('../app'); 


chai.use(chaiHttp);
chai.should();
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists 
} = require('sequelize-test-helpers')

const transaction = require('../models/transaction')

describe('Transaction Module', function() {
    describe('models transaction check', () => {
        const Db = transaction(sequelize, dataTypes)
        const transactionDb = new Db()
        
        checkModelName(Db)('transaction');
        
        context('properties', () => {
            ;['totalOrder', 'status'].forEach(
            checkPropertyExists(transactionDb)
            )
        })
    })

    describe('Transaction endpoint check', () => {
        it('Create new transaction on Gebyar Festival VVIP', function() {
            chai.request(app)
            .post('/transaction')
            .send([
                {
                    "ticketId": 1,
                    "qty": 1
                }
            ])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Testing exception request order invalid', function() {
            chai.request(app)
            .post('/transaction')
            .send([
                {
                    "ticketId": 1,
                    "qty": 1
                },
                {
                    "ticketId": 5,
                    "qty": 1
                }
            ])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Get all transaction', function() {
            chai.request(app)
            .get('/transaction')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
        
        it('Get last created transaction', async function() {
            const { transaction } = require('../models')
            var lastOrder = await transaction.findOne({order: [ [ 'createdAt', 'DESC' ]]})

            chai.request(app)
            .get('/transaction/' + lastOrder.dataValues.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Purchase last transaction', async function() {
            const { transaction } = require('../models')
            var lastOrder = await transaction.findOne({order: [ [ 'createdAt', 'DESC' ]]})

            chai.request(app)
            .post('/transaction/purchase/' + lastOrder.dataValues.id)
            .send({
                "purchaseAmount": 20000000,
                "paymentMethod": "credit-card"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Buying time 500ms to complete await', function(done) {
            this.timeout(5000); // 5 seconds
            setTimeout(done, 3000);
        });
    })
})