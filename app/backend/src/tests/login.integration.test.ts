import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import MockLogin from "./mocks/MockLogin";
import SequelizeUser from "../database/models/SequelizeUsers";

chai.use(chaiHttp);

const BAD_REQUEST = 400;
const OK = 200;
const UNAUTHORIZED = 401;
const ALL_FIELDS_REQUIRED = { "message": "All fields must be filled" }
const TOKEN_REQUIRED = { "message": "Token not found" }
const TOKEN_INVALID = { "message": "Token must be a valid token" }
const INVALID_FIELDS = { message: 'Invalid email or password' };
const { expect } = chai;


describe('Test POST /login', () => {
  beforeEach(sinon.restore);
  it('should return 400 when email is not provided', async () => {
    //arrange
    const httpBody = MockLogin.loginEmailRequired;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(BAD_REQUEST);
    expect(response.body).to.be.deep.equal(ALL_FIELDS_REQUIRED);
  })
  it('should return 400 when password is not provided', async () => {
    //arrange
    const httpBody = MockLogin.loginPasswordRequired;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(BAD_REQUEST);
    expect(response.body).to.be.deep.equal(ALL_FIELDS_REQUIRED);
  })
  it('should return 401 when email is invalid', async () => {
    //arrange
    const httpBody = MockLogin.loginEmailInvalid;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(INVALID_FIELDS);
  })
  it('should return 401 when password is invalid', async () => {
    //arrange
    const httpBody = MockLogin.loginPasswordInvalid;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(INVALID_FIELDS);
  })
  it('should return 401 when password is not found', async () => {
    //arrange
    const userModel = SequelizeUser.build(MockLogin.userLogged)
    sinon.stub(SequelizeUser, 'findOne').resolves(userModel)
    const httpBody = MockLogin.loginPasswordNotFound;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(INVALID_FIELDS);
  })
  it('should return token when email e password is valid', async () => {
    //arrange
    const userModel = SequelizeUser.build(MockLogin.userLogged)
    sinon.stub(SequelizeUser, 'findOne').resolves(userModel)
    const httpBody = MockLogin.loginValid;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(OK);
    expect(response.body).to.have.property('token');
  })
  it('should return 401 when email is not found', async () => {
    //arrange
    sinon.stub(SequelizeUser, 'findOne').resolves(null)
    const httpBody = MockLogin.loginEmailNotFound;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(INVALID_FIELDS);
  })
})

describe('Test GET /login/role', () => {
  beforeEach(sinon.restore);
  it('should return 401 when token is not provided', async () => {
    //arrange
    const token = ""
    //act
    const response = await chai.request(app)
    .get('/login/role')
    .set('Authorization', token);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(TOKEN_REQUIRED);

  })
  it('should return 401 when token is invalid', async () => {
    //arrange
    const token = 'bode voador'
    //act
    const response = await chai.request(app)
    .get('/login/role').set('Authorization', token);
    //assert
    expect(response.status).to.be.equal(UNAUTHORIZED);
    expect(response.body).to.be.deep.equal(TOKEN_INVALID);
  })
  it('should return 200 when token is valid', async () => {
    //arrange
    const {token} = MockLogin.tokenValid
    //act
    const response = await chai.request(app)
    .get('/login/role').set('Authorization', token);
    //assert
    expect(response.status).to.be.equal(OK);
    expect(response.body).to.be.deep.equal({role: 'user'});
  })
})