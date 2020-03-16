'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore');

app.get('/apps', (req, res) => {
  const { search = '', sort, genre = '' } = req.query;

  if (sort) {
    if(!['Rating', 'App', 'Genre'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }

  let results = apps
    .filter(app =>
      app
        .App
        .toLowerCase()
        .includes(search.toLowerCase()));

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a [sort] < b[sort] ? -1 : 0;
      });
  }

  if (genre) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
      return res
        .status(400)
        .send('Sort must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
    }
  }

  results = results.filter(app => 
    app.Genres.toLowerCase().includes(genre.toLowerCase()));

  if (genre) {
    results.sort((a,b) => {
      return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
    });
  }

  res
    .json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});