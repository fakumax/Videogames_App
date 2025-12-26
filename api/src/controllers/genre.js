const axios = require('axios');
const { Genre } = require('../db');
const { RAWG_API_KEY } = process.env;

const RAWG_URL = 'https://api.rawg.io/api';

async function getAllGenreAPI(req, res, next) {
  try {
    const { data } = await axios.get(`${RAWG_URL}/genres?key=${RAWG_API_KEY}`);
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
