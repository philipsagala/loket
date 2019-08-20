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
 
const location = require('../models/location')
describe('Location Module', function() {
    describe('models location check', () => {
        const Db = location(sequelize, dataTypes)
        const locationDb = new Db()
        
        checkModelName(Db)('location');
        
        context('properties', () => {
            ;['name', 'city', 'province', 'address', 'longitude', 'latitude'].forEach(
            checkPropertyExists(locationDb)
            )
        })
    })

    describe('Location endpoint check', () => {
        it('Get all location', function() {
            chai.request(app)
            .get('/location')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Get first location', function() {
            chai.request(app)
            .get('/location/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Create new location', function() {
            var randomName = uuid();

            chai.request(app)
            .post('/location')
            .send({
                name: "Jaya Ancol-" + randomName.uuid(),
                city: "Jakarta",
                province: "DKI Jakarta",
                address: "Jalan Lodan Timur No.7, RW.10, Ancol, Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14430",
                longitude: "-6.1261499",
                latitude: "106.8307435"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });

        it('Update location Plaza Festival', function() {
            var randomName = uuid();

            chai.request(app)
            .put('/location/1')
            .send({
                name: "Plaza Festival-Updated" + randomName.uuid()
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
    })
})