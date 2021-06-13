const {Router} = require('express');
const router = Router();

const {getAllPlatformAPI} = require('../controllers/platform');

router.get('/', getAllPlatformAPI );



module.exports = router;