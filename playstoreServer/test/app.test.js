'use strict';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps endpoint', () => {
  it('should return an object describing an app', () => {
    return supertest(app)
      .get('/apps?genres=card')
      .query({'Genres': 'Card'})
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .then(res => {
        expect(res.body).to.be.an('object');
      });
  });
  
  it('should contain Genres and/or Rating keys', () => {
    return supertest(app)
      .get('/apps?genres=card')
      .query({'Genres': 'Card', 'Rating': 4})
      .expect(200)
      .then(res => {
        res.body.forEach(app => {
          expect(res.body).to.have.any.keys('Genres', 'Rating');
        });
      });
  });
});