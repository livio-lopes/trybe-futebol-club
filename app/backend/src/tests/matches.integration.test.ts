import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import MockMatches from "./mocks/MockMatches";
import SequelizeMatches from "../database/models/SequelizeMatches";
import MockLogin from "./mocks/MockLogin";



chai.use(chaiHttp);

const { expect } = chai;

const OK = 200
const NOT_FOUND = 404
const CREATED = 201
const UNPROCESSABLE_ENTITY = 422

describe("Test integration Matches", () => {
  afterEach(sinon.restore);
  it("Should return all matches on GET /matches", async () => {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(MockMatches.allMatches as any)
    sinon
    // Act
    const response = await chai.request(app).get('/matches')
    // Assert
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal(MockMatches.allMatches)
  })
  
  it("Should return all matches with inProgress true on GET /matches?inProgress=true", async () => {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(MockMatches.allMatches as any)
    // Act
    const response = await chai.request(app).get('/matches?inProgress=true')
    // Assert
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal(MockMatches.allMatchesCompleted)
  })
  it("Should return all matches with inProgress false on GET /matches?inProgress=false", async () => {
    // Arrange
    sinon.stub(SequelizeMatches, 'findAll').resolves(MockMatches.allMatches as any)
    // Act
    const response = await chai.request(app).get('/matches?inProgress=false')
    // Assert
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal(MockMatches.allMatchesInProgress)
  })
  it('Should return status 404 when PATCH /matches/:id/finish', async () => {
    // Arrange
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null)
    // Act
    const login = await chai.request(app)
    .post('/login')
    .send(MockLogin.loginValid)

    const token = login.body.token
    const response = await chai.request(app)
    .patch('/matches/45/finish')
    .set('Authorization', token)
    // Assert
    expect(response.status).to.be.equal(NOT_FOUND)
    expect(response.body).to.be.deep.equal({ message: 'Match not found' })
  })
  it('Should return status 200 when PATCH /matches/:id/finish', async () => {
    // Arrange
    const matchFound = SequelizeMatches.build(MockMatches.matchIdFound)
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matchFound)
    sinon.stub(SequelizeMatches, 'update').resolves()
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    // Act
    const response = await chai.request(app)
    .patch('/matches/1/finish').set('Authorization', token)
    // Assert
    expect(response.status).to.be.equal(OK)
    expect(response.body).to.be.deep.equal({ message: 'Finished' })
  })
  it('should return status 404 when PATCH /matches/:id', async () => {
    // Arrange
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null)
    // Act
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    const response = await chai.request(app).patch('/matches/45').set('Authorization', token)
    // Assert
    expect(response.status).to.be.equal(NOT_FOUND)
    expect(response.body).to.be.deep.equal({ message: 'Match not found' })
  })
  it('Should return status 200 when PATCH /matches/:id', async () => {
    // Arrange
    const matchFound = SequelizeMatches.build(MockMatches.matchIdFound)
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matchFound)
    sinon.stub(SequelizeMatches, 'update').resolves()
    // Act
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    const response = await chai.request(app).patch('/matches/1').set('Authorization', token).send(MockMatches.goalsScore)
    // Assert
    expect(response.status).to.be.equal(OK)
  })
  it('Should return status 201 when POST /matches', async ()=>{
    // Arrange
    const MockMatch = SequelizeMatches.build(MockMatches.matchCreated)
    sinon.stub(SequelizeMatches, 'create').resolves(MockMatch)
    const httpBody = MockMatches.matchCreated
    // Act
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    const response = await chai.request(app).post('/matches').set('Authorization', token).send(httpBody)
    // Assert
    expect(response.status).to.be.equal(CREATED)
    expect(response.body).to.be.deep.equal(MockMatches.matchCreated)

  })
  it('Should return status 422 when homeTeam is equal awayTeam on POST /matches', async () => {
    //Arrange
    const httpBody = MockMatches.teamEquals
    //Act
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    const response = await chai.request(app)
    .post('/matches').send(httpBody).set("Authorization", token)
    //Assert
    expect(response.status).to.be.equal(UNPROCESSABLE_ENTITY)
  })
  it('Should return status 404 when homeTeam or awayTeam not found on POST /matches', async ()=>{
    //Arrange
    const httpBody = MockMatches.matchTeamNotFound
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null) 
    // Act
    const login = await chai.request(app).post('/login').send(MockLogin.loginValid)
    const token = login.body.token
    const response = await chai.request(app).post('/matches').send(httpBody).set("Authorization", token)
    //Assert
    expect(response.status).to.be.equal(NOT_FOUND)
  })
})