const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { RAWG_API_KEY } = process.env;
const { Op } = require('sequelize');

const RAWG_URL = 'https://api.rawg.io/api';

const mapRawgResults = (results) =>
  results.map((game) => ({
    id: game.id,
    name: game.name,
    img: game.background_image,
    genres: game.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),
    platforms:
      game.platforms?.map((p) => ({
        id: p.platform.id,
        name: p.platform.name,
      })) || [],
    rating: game.rating,
  }));

async function fetchDbGamesByName(name) {
  return Videogame.findAll({
    attributes: ['id', 'name', 'rating', 'img'],
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
}

async function fetchDbGamesAll() {
  return Videogame.findAll({
    attributes: ['id', 'name', 'rating', 'img'],
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
}

async function fetchRawg({ name, page, pageSize }) {
  const params = [`key=${RAWG_API_KEY}`, `page=${page}`, `page_size=${pageSize}`];
  if (name) params.push(`search=${encodeURIComponent(name)}`);
  const { data } = await axios.get(`${RAWG_URL}/games?${params.join('&')}`);
  return data;
}

async function getAllVideogames(req, res, next) {
  const { name } = req.query;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.page_size) || 15;

  try {
    // DB: sólo la primera página (y si aplica filtro por nombre)
    const dbData = name ? await fetchDbGamesByName(name) : page === 1 ? await fetchDbGamesAll() : [];

    // API RAWG: se pide la página solicitada
    const apiData = await fetchRawg({ name, page, pageSize });
    const apiMapped = mapRawgResults(apiData.results || []);

    // Total informado por RAWG + los de DB en la primera página (si corresponde)
    const total = (apiData.count || 0) + dbData.length;
    const hasMore = Boolean(apiData.next);

    const combined = dbData.concat(apiMapped);

    return res.json({
      results: combined,
      page,
      pageSize,
      total,
      hasMore,
    });
  } catch (err) {
    next(err);
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
