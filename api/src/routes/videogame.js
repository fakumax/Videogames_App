const { Router } = require('express');
//const { Videogame } = require('../db');
const {
  getAllVideogames,
  getVideogameId,
  postVideogame

} = require('../controllers/videogame');
const router = Router();

router.get('/', getAllVideogames);
router.get('/:id', getVideogameId)
router.post('/', postVideogame);
module.exports = router;