const {Router} = require('express');
const router = Router();

const {getAllGenreAPI} = require('../controllers/genre');

router.get('/', getAllGenreAPI );



module.exports = router;