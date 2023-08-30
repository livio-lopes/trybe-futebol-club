import * as chai from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import MockMatches from "./mocks/MockMatches";
import SequelizeMatches from "../database/models/SequelizeMatches";



chai.use(chaiHttp);

const { expect } = chai;

const OK = 200

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
  it.skip('Should return status 200 when PATCH /matches/:id/finish', async () => {})
  it.skip('Should return status 200 when PATCH /matches/:id', async () => {})
  it.skip('Should return status 422 when homeTeam is equal awayTeam on POST /matches', async () => {})
  it.skip('Should return status 404 when homeTeam or awayTeam not found on POST /matches', async ()=>{})
  it.skip('Should return status 201 when POST /matches', async ()=>{})
})