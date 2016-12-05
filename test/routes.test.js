//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require( 'mongoose' );
let Post = require( '../models/post.model' );

//Require the dev-dependencies
let chai = require( 'chai' );
let chaiHttp = require( 'chai-http' );
let server = require( '../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe( 'Query routes', () => {
  beforeEach( ( done ) => { //Before each test we empty the database
    Post.remove( {}, ( err ) => { 
      done();         
    });     
  });
/*
  * Test the /GET route
   */
describe( '/GET posts', () => {
  it( 'it should GET all the posts', ( done ) => {
    chai.request( server )
      .get( '/api/v1/posts' )
      .end( ( err, res ) => {
        res.should.have.status( 200 );
        res.body.should.be.a( 'array' );
        res.body.length.should.be.eql( 0 );
      done();
      });
    });
  });
  /*
  * Test the /POST route
  */
  describe( '/POST add', () => {
    it( 'should not POST a post without a username', (done) => {
      let newPost = {
        availableTime: '01:00',
        setup: 'Google Hangouts',
        interests: 'testing'
      }
        chai.request( server )
            .post( '/api/v1/add' )
            .set( 'content-type', 'application/x-www-form-urlencoded' )
            .send( newPost )
            .end( ( err, res ) => {
                // console.log(res);
                res.should.have.status( 200 );
                res.body.should.be.a( 'object' );
                res.body.should.have.property( 'errors' );
                res.body.errors.should.have.property( 'username' );
                res.body.errors.username.should.have.property( 'kind' ).eql('required');
              done();
            });
      });
  it( 'should not POST a post without an availableTime', ( done ) => {
      let newPost = {
        username: 'camperbot',
        setup: 'Google Hangouts',
        interests: 'testing'
      }
        chai.request( server )
            .post( '/api/v1/add' )
            .set( 'content-type', 'application/x-www-form-urlencoded' )
            .send( newPost )
            .end( ( err, res ) => {
                console.log(res);
                res.should.have.status( 200 );
                res.body.should.be.a( 'object' );
                res.body.should.have.property( 'errors' );
                res.body.errors.should.have.property( 'endTime' );
                console.log(res.body.errors);
                res.body.errors.endTime.should.have.property( 'kind' ).eql( 'required' );
              done();
            });
      });

  });
});


