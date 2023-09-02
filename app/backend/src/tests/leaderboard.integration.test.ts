import * as chai from "chai";
import * as sinon from "sinon";
import MockLeaderboard from "./mocks/MockLeaderboard";
import MockMatch from "./mocks/MockMatches";
import MockTeam from "./mocks/MockTeams";
import SequelizeTeam from "../database/models/SequelizeTeams";
import SequelizeMatch from "../database/models/SequelizeMatches";
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from "../app";

chai.use(chaiHttp);
const { expect } = chai;

const OK = 200;

describe('Test integration of Leaderboard', () => {
  beforeEach(sinon.restore);
  it('should return 200 when GET /leaderboard', async () => {
    //arrange
    const modelTeam = MockTeam.allTeams as any;
    sinon.stub(SequelizeTeam, 'findAll').resolves(modelTeam);
    const modelMatch = MockMatch.allMatches as any;
    sinon.stub(SequelizeMatch, 'findAll').resolves(modelMatch);
 
    //act
    const response = await chai.request(app).get('/leaderboard')
    //assert

    expect(response.status).to.be.equal(OK);
    expect(response.body[0]).to.have.property('totalPoints');
    expect(response.body[0]).to.have.property('totalGames');
    expect(response.body[0]).to.have.property('totalVictories');
    expect(response.body[0]).to.have.property('totalDraws');
    expect(response.body[0]).to.have.property('totalLosses');
    expect(response.body[0]).to.have.property('goalsFavor');
    expect(response.body[0]).to.have.property('goalsOwn');
    expect(response.body[0]).to.have.property('goalsBalance');
    expect(response.body[0]).to.have.property('efficiency');
   
  })
  it('should return 200 when GET /leaderboard/home', async () => {
        //arrange
        const modelTeam = MockTeam.allTeams as any;
        sinon.stub(SequelizeTeam, 'findAll').resolves(modelTeam);
        const modelMatch = MockMatch.allMatches as any;
        sinon.stub(SequelizeMatch, 'findAll').resolves(modelMatch);
     
        //act
        const response = await chai.request(app).get('/leaderboard/home')
        //assert
    
        expect(response.status).to.be.equal(OK);
        expect(response.body[0]).to.have.property('totalPoints');
        expect(response.body[0]).to.have.property('totalGames');
        expect(response.body[0]).to.have.property('totalVictories');
        expect(response.body[0]).to.have.property('totalDraws');
        expect(response.body[0]).to.have.property('totalLosses');
        expect(response.body[0]).to.have.property('goalsFavor');
        expect(response.body[0]).to.have.property('goalsOwn');
        expect(response.body[0]).to.have.property('goalsBalance');
        expect(response.body[0]).to.have.property('efficiency');
       
  })
  it('should return 200 when GET /leaderboard/away', async () => {
        //arrange
        const modelTeam = MockTeam.allTeams as any;
        sinon.stub(SequelizeTeam, 'findAll').resolves(modelTeam);
        const modelMatch = MockMatch.allMatches as any;
        sinon.stub(SequelizeMatch, 'findAll').resolves(modelMatch);
     
        //act
        const response = await chai.request(app).get('/leaderboard/away')
        //assert
    
        expect(response.status).to.be.equal(OK);
        expect(response.body[0]).to.have.property('totalPoints');
        expect(response.body[0]).to.have.property('totalGames');
        expect(response.body[0]).to.have.property('totalVictories');
        expect(response.body[0]).to.have.property('totalDraws');
        expect(response.body[0]).to.have.property('totalLosses');
        expect(response.body[0]).to.have.property('goalsFavor');
        expect(response.body[0]).to.have.property('goalsOwn');
        expect(response.body[0]).to.have.property('goalsBalance');
        expect(response.body[0]).to.have.property('efficiency');
       
  })
})