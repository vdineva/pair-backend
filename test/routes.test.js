//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require( 'chai' );
let chaiHttp = require( 'chai-http' );
let server = require( '../server');
let routes = require( '../routes' );
let should = chai.should();

let ObjectId = require( 'mongodb' ).ObjectID;
let router = require( 'express' ).Router();
let queries = require( '../controllers/queries' );

// Database for testing
let mongodb = require( 'mongodb' );
let mongo = mongodb.MongoClient;
let url = process.env.MONGODB_URI;

mongo.connect( url, function( err, db ) {
  if ( err ) console.log( err );
  chai.use(chaiHttp);
  //Our parent block
  describe('Query routes', () => {
      beforeEach((done) => { //Before each test we empty the database
          db.collection( 'posts' ).remove({}, (err) => { 
            done();         
          });     
      });
  /*
    * Test the /GET route
    */
    describe('/GET posts', () => {
        it('it should GET all the posts', (done) => {
          chai.request(server)
              .get('/posts')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

  });
});