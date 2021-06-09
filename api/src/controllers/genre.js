const axios = require('axios');
const { Genre } = require('../db');
const { GENRES_URL } = require('../constants');
const {API_KEY} = process.env;

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
    const dbplatform = await funcName();
    console.log(dbplatform);
    return res.json(dbresult);
  } catch (err) {
    next(err);
  }
}

// --- Values from platform
async function funcName() {

 const { data } = await axios.get( `https://api.rawg.io/api/platforms?key=506cda2ee2aa4c34b7e764ec5f4c1e08`);
 const results = await data.results.map((valor) =>
  ({
   
    name: valor.name
  })
);
  return results;
}



module.exports = {
    getAllGenreAPI,
};