import MockTeams from "./mocks/MockTeams";
import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import MockLogin from "./mocks/MockLogin";

chai.use(chaiHttp);

const BAD_REQUEST = 400;
const OK = 200;
const ALL_FIELDS_REQUIRED = { "message": "All fields must be filled" }

const { expect } = chai;


describe('Test integration Login', () => {
  afterEach(sinon.restore);
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
    const httpBody = MockLogin.loginPasswordInvalid;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(BAD_REQUEST);
    expect(response.body).to.be.deep.equal(ALL_FIELDS_REQUIRED);
  })
  it('should return token when email e password is valid', async () => {
    //arrange
    const httpBody = MockLogin.loginValid;
    //act
    const response = await chai.request(app).post('/login').send(httpBody);
    //assert
    expect(response.status).to.be.equal(OK);
    expect(response.body).to.have.property('token');
  })
})