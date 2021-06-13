const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const genreRoute = require('./genre');
const videogameRoute = require('./videogame');
const platformsRoute = require('./platform');


router.use('/genres', genreRoute);
router.use('/videogames', videogameRoute);
router.use('/platforms', platformsRoute);

module.exports = router;
