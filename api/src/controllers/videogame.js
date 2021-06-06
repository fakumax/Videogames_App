const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { GAMES_URL } = require('../constants');
const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');
var validator = require('validator');

var count = 0;
var offsetDb = 0;

/* Async Function Get ALL Videogame  */
async function getAllVideogames(req, res, next) {
  const { search } = req.query;
  //   if (search) {
  //     //----------------------------------------
  //   try {
  //       const { data } = await axios.get(`${Videogame_URL}/${name}`);
  //       const values = {
  //         id: data.id,
  //         name: data.name,
  //         types: data.types.map((v) => {return{name: v.type.name}}),
  //         img: data.sprites.other['official-artwork'].front_default,
  //       };
  //       const dbData = await Videogame.findAll({ where: { name: name } });
  //       const response = dbData.concat(values);
  //       return res.json(response);
  //       //----------------------------------------
  //     } catch (err) {
  //       const dbData = await Videogame.findAll({ where: { name: name } });
  //       return dbData
  //         ? res.json(dbData)
  //         : res.status(404).json({ message: 'the Videogame has not been found.' });
  //     }
  //     //----------------------------------------
  //   } else {

  // Si query name está vacío entonces busca todos los resultados.
  //try {
  //-----------BD CONSULTA------------------
  //   const dbData = await Videogame.findAll({
  //     attributes: ['id', 'name'],
  //     limit: 40,
  //     offset: 0,
  //     include: {
  //       model: Type,
  //       attributes: ['name'],
  //       through: {
  //         attributes: [],
  //       },
  //     },
  //   });
  //offsetDb += dbData.length;
  //----------------------------------------
  //const url = await axios.get(`${GAMES_URL}`);
  //count += 40;
  //   const filterURL = await url.data.results.map((value) =>
  //     axios.get(`${value.url}`)
  //   );
  try {
    //-----------BD CONSULTA------------------
    const dbData = await Videogame.findAll({
      attributes: ['id', 'name'],
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    const { data } = await axios.get(`${GAMES_URL}${API_KEY}`);
    const resp = data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres.map((genre) => ({ id: genre.id, name: genre.name })),
      rating: game.rating,
    }));
    const response = await dbData.concat(resp);
    return res.json(response);
  } catch (err) {
    next(err);
  }
}

/* Async Function Get GAME ID */
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
        : res.status(404).json({ message: 'the Game has not been found.' });
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
        background_image: data.background_image,
      });
    }
  } catch (err) {
    return res.status(404).json({ message: 'The Game has not been found.' });
  }
}

/* Async Function Post VIDEOGAME  */
async function postVideogame(req, res, next) {
  const videogame = req.body;
  console.log('in the api now', videogame);
  // const { name, description, release, rating, platforms } = req.body;
  // console.log( req.body);
  try {
    // const game = await Videogame.create({
    //   name: name,
    //   description: description,
    //   release:release,
    //   rating:rating,
    //   platforms:platforms.map((otro) => ({id:otro.id,name:otro.name})),

    // });
    // const genress = genres.map((genre) => genre.id);
    // game.addGenres(genress);
    // return res.json(game);
    const game = await Videogame.create({
      ...videogame,
    });
    const genres = videogame.genres.map((genre) => genre.id);
    console.log('genres after map', genres);
    game.addGenres(genres); //[4,5]saco los id y los inserto en la tabla, asociando al game
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
