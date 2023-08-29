import MockTeams from "./mocks/MockTeams";
import * as chai  from "chai";
import * as sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";
import SequelizeTeams from "../database/models/SequelizeTeams";

chai.use(chaiHttp);

const {expect} = chai;

const status = {
  OK: 200,
}

describe("Test integration Teams", () => {
  afterEach(sinon.restore);
  it("Should return all teams on GET /teams", async () => {
    // Arrange
    const listTeams = SequelizeTeams.bulkBuild(MockTeams.getAllTeams);
    sinon.stub(SequelizeTeams, "findAll").resolves(listTeams)
    //act
    const httpResponse = await chai.request(app).get("/teams")
    //assert
    expect(httpResponse.status).to.be.equal(status.OK)
    expect(httpResponse.body).to.be.deep.equal(MockTeams.getAllTeams)
  })
  it("Should return a team on GET /teams/:id", async () => {
    // Arrange
    const team = SequelizeTeams.build(MockTeams.getAllTeams[0]);
    sinon.stub(SequelizeTeams, "findByPk").resolves(team)
    //act
    const httpResponse = await chai.request(app).get("/teams/1")
    //assert
    expect(httpResponse.status).to.be.equal(status.OK)
    expect(httpResponse.body).to.be.deep.equal(MockTeams.getAllTeams[0])
  })
})