/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'A Mario Bros Game',
  release: "2017-01-01",
  rating: 22,
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));

  describe('GET /videogames', () => {
    it('should get 200', () => agent.get('/videogames').expect(200));
  });
  describe('GET Videogame by ID', () => {
    it('should get 200', () => agent.get('/videogames/2').expect(200));
  });
  describe('GET Videogame by NAMES', () => {
    it('should get 200', () => agent.get('/videogames?name=diablo').expect(200));
  });
  describe('GET Videogame by ID error', () => {
    it('should get 404', () => agent.get('/videogames/2322213').expect(404));
  });
});
