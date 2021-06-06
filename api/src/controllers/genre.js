const axios = require('axios');
const { Genre } = require('../db');
const { GENRES_URL } = require('../constants');

async function getAllGenreAPI(req, res, next) {
  try {
    const { data } = await axios.get(`${GENRES_URL}`); //, {
    const results = await data.results.map((valor) =>
      Genre.findOrCreate({
        where: {
          name: valor.name,
        },
      })
    );
    const dbresult = await Genre.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return res.json(dbresult);
  } catch (err) {
    next(err);
  }
}

module.exports = {
    getAllGenreAPI,
};