'use strict';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps endpoint', () => {
  it('should return an array of objects describing an app', () => {
    return supertest(app)
      .get('/apps')
      .query({'Genres': 'Card'})
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });
  
  it('should contain Genres and/or Rating keys', () => {
    return supertest(app)
      .get('/apps')
      .query({'Genres': 'Card', 'Rating': 4})
      .expect(200)
      .then(res => {
        res.body.forEach(app => {
          expect(res.body).to.have.lengthOf.at.least(1);
          const result = res.body[0];
          expect(result).to.include.all.keys('Genres', 'Rating');
        });
      });
  });
});