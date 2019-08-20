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
 
const ticket = require('../models/ticket')
describe('Ticket Module', function() {
    describe('models ticket check', () => {
        const Db = ticket(sequelize, dataTypes)
        const ticketDb = new Db()
        
        checkModelName(Db)('ticket');
        
        context('properties', () => {
            ;['name', 'type', 'price', 'openSeat', 'availableSeat'].forEach(
            checkPropertyExists(ticketDb)
            )
        })
    })

    describe('Ticket endpoint check', () => {
        it('Get all ticket', function() {
            chai.request(app)
            .get('/ticket')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Get first ticket', function() {
            chai.request(app)
            .get('/ticket/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Create new ticket on Event Gebyar Loket Indonesia', function() {
            var randomName = uuid();

            chai.request(app)
            .post('/ticket/1')
            .send({
                eventId: 1,
                name: "Random Gebyar - "+ randomName.uuid(),
                type: "Festival",
                price: 150000,
                openSeat: 1000,
                availableSeat: 1000,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Update ticket Gebyar Festival VVIP', function() {
            var randomName = uuid();

            chai.request(app)
            .put('/ticket/1')
            .send({
                name: "Festival VVIP - Updated" + randomName.uuid()
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    })
})