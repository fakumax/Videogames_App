const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { RAWG_API_KEY } = process.env;
const { Op } = require('sequelize');

const RAWG_URL = 'https://api.rawg.io/api';

async function getGamebyName(name) {
  const { data } = await axios.get(`${RAWG_URL}/games?key=${RAWG_API_KEY}&search=${name}`);

  const allGamesApi = data.results.map((game) => ({
    id: game.id,
    name: game.name,
    img: game.background_image,
    genres: game.genres.map((genre) => ({ id: genre.id, name: genre.name })),
    platforms: game.platforms?.map((p) => ({ id: p.platform.id, name: p.platform.name })) || [],
    rating: game.rating,
  }));

  const allGamesDb = await Videogame.findAll({
    attributes: ['id', 'name', 'rating'],
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: Genre,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return allGamesDb ? allGamesDb.concat(allGamesApi) : allGamesApi;
}

async function getAllVideogames(req, res, next) {
  const { name } = req.query;
  if (name) {
    try {
      const gamesByName = await getGamebyName(name);
      res.json(gamesByName);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const dbData = await Videogame.findAll({
        attributes: ['id', 'name', 'rating'],
        include: [
          {
            model: Genre,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Platform,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      let containerGames = [];
      let nextUrl = `${RAWG_URL}/games?key=${RAWG_API_KEY}`;
      for (let i = 1; i < 5; i++) {
        const { data } = await axios.get(nextUrl);
        containerGames.push(data.results);
        if (data.next === null) break;
        nextUrl = data.next;
      }

      const resp = containerGames.flat().map((game) => ({
        id: game.id,
        name: game.name,
        img: game.background_image,
        genres: game.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        })),
        platforms: game.platforms?.map((p) => ({
          id: p.platform.id,
          name: p.platform.name,
        })) || [],
        rating: game.rating,
      }));
      const response = resp.concat(dbData);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

async function getVideogameId(req, res, next) {
  const { id } = req.params;
  try {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isUUID) {
      const dbData = await Videogame.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Genre,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
          {
            model: Platform,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return dbData
        ? res.json(dbData)
        : res.status(404).json({ message: 'The Game has not been found.' });
    } else {
      const { data } = await axios.get(`${RAWG_URL}/games/${id}?key=${RAWG_API_KEY}`);

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

async function postVideogame(req, res, next) {
  const videogame = req.body;
  try {
    const game = await Videogame.create({ ...videogame });
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
