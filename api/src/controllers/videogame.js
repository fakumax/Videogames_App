const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { GAMES_URL } = require('../constants');
const { API_KEY } = process.env;
const { Sequelize, Op } = require('sequelize');
var validator = require('validator');

var count = 0;
var offsetDb = 0;

async function getGamebyName(name) {
  const { data } = await axios.get(`${GAMES_URL}${API_KEY}&search=${name}`);

  const allGamesApi = data.results.map((game) => ({
    id: game.id,
    name: game.name,
    img: game.background_image,
    genres: game.genres.map((genre) => ({ id: genre.id, name: genre.name })),
    rating: game.rating,
  }));

  const allGamesDb = await Videogame.findAll({
    attributes: ['id', 'name', 'rating'],
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genre,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  });
  return allGamesDb ? allGamesDb.concat(allGamesApi) : allGamesApi;
}

/* Async Function Get ALL Videogame  */
async function getAllVideogames(req, res, next) {
  const { name } = req.query;
  if (name) {
    //----------------------------------------
    try {
      const gamesByName = await getGamebyName(name);
      res.json(gamesByName);
    } catch (error) {
      next(error);
    }
  } else {
    //----------------------------------------
    try {
      //-----------BD CONSULTA------------------
      const dbData = await Videogame.findAll({
        attributes: ['id', 'name', 'rating'],
        include: {
          model: Genre,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      });
      const { data } = await axios.get(`${GAMES_URL}${API_KEY}`);
      const resp = data.results.map((game) => ({
        id: game.id,
        name: game.name,
        img: game.background_image,
        genres: game.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        })),
        rating: game.rating,
      }));
      const response = await dbData.concat(resp);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

/* Async Function Get VIDEOGAME ID */
async function getVideogameId(req, res, next) {
  const { id } = req.params;
  try {
    if (validator.isUUID(id)) {
      const dbData = await Videogame.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: {
          model: Genre,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      });
      return dbData
        ? res.json(dbData)
        : res.status(404).json({ message: 'The Game has not been found.' });
    } else {
      const { data } = await axios.get(`${GAMES_URL}/${id}${API_KEY}`);

      return res.json({
        id: data.id,
        name: data.name,
        description: data.description_raw,
        release: data.released,
        rating: data.rating,
        genres: data.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        })),
        platforms: data.platforms.map((platform) => ({
          id: platform.platform.id,
          name: platform.platform.name,
        })),
        img: data.background_image,
      });
    }
  } catch (err) {
    return res.status(404).json({ message: 'The Game has not been found.' });
  }
}

/* Async Function Post VIDEOGAME  */
async function postVideogame(req, res, next) {
  const videogame = req.body;
  // const { name, description, release, rating } = req.body;
  try {
    const game = await Videogame.create({
      ...videogame,
    });
    const genres = videogame.genres.map((genre) => genre.id);
    const platform = videogame.platforms.map((platform) => platform.id);
    game.addPlatform(platform);
    game.addGenres(genres);
    return res.send(game);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllVideogames,
  getVideogameId,
  postVideogame,
};
