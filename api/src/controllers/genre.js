const axios = require('axios');
const { Genre, Platform } = require('../db');
const { GENRES_URL } = require('../constants');
const { API_KEY } = process.env;

async function getAllGenreAPI(req, res, next) {
  try {
    const { data } = await axios.get(`${GENRES_URL}${API_KEY}`); //, {
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
   return await res.json(dbresult);
  } catch (err) {
    next(err);
  }
}


module.exports = {
  getAllGenreAPI,
};
