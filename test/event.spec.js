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
 
const event = require('../models/event')
describe('Event Module', function() {
    describe('models event check', () => {
        const Db = event(sequelize, dataTypes)
        const eventDb = new Db()
        
        checkModelName(Db)('event');
        
        context('properties', () => {
            ;['name', 'start', 'end'].forEach(
            checkPropertyExists(eventDb)
            )
        })
    })

    describe('Event endpoint check', () => {
        it('Get all event', function() {
            chai.request(app)
            .get('/event')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Get first event', function() {
            chai.request(app)
            .get('/event/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Create new event', function() {
            var randomName = uuid();

            chai.request(app)
            .post('/event/1')
            .send({
                name: "Random Loket Event - "+ randomName.uuid(),
                start: "2020-01-31 09:00:00",
                end: "2020-02-01 21:00:00",
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Update event Gebyar Loket Indonesia', function() {
            var randomName = uuid();

            chai.request(app)
            .put('/event/1')
            .send({
                name: "Gebyar Loket Indonesia-Updated" + randomName.uuid()
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    })
})