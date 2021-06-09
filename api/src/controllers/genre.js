const axios = require('axios');
const { Genre, Platform } = require('../db');
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

//  const { data } = await axios.get( `https://api.rawg.io/api/platforms?key=506cda2ee2aa4c34b7e764ec5f4c1e08`);
//  const results = await data.results.map((valor) =>
//   ({
   
//     name: valor.name
//   })
// );
//   return results;
// }
const platform = await Platform.bulkcreate([
  { name: 'PC' },
  { name: 'PlayStation 5' },
  { name: 'Xbox One' },
  { name: 'PlayStation 4' },
  { name: 'Xbox Series S/X' },
  { name: 'Nintendo Switch' },
  { name: 'iOS' },
  { name: 'Android' },
  { name: 'Nintendo 3DS' },
  { name: 'Nintendo DS' },
  { name: 'Nintendo DSi' },
  { name: 'macOS' },
  { name: 'Linux' },
  { name: 'Xbox 360' },
  { name: 'Xbox' },
  { name: 'PlayStation 3' },
  { name: 'PlayStation 2' },
  { name: 'PlayStation' },
  { name: 'PS Vita' },
  { name: 'PSP' },
  { name: 'Wii U' },
  { name: 'Wii' },
  { name: 'GameCube' },
  { name: 'Nintendo 64' },
  { name: 'Game Boy Advance' },
  { name: 'Game Boy Color' },
  { name: 'Game Boy' },
  { name: 'SNES' },
  { name: 'NES' },
  { name: 'Classic Macintosh' },
  { name: 'Apple II' },
  { name: 'Commodore / Amiga' },
  { name: 'Atari 7800' },
  { name: 'Atari 5200' },
  { name: 'Atari 2600' },
  { name: 'Atari Flashback' },
  { name: 'Atari 8-bit' },
  { name: 'Atari ST' },
  { name: 'Atari Lynx' },
  { name: 'Atari XEGS' },
  { name: 'Genesis' },
  { name: 'SEGA Saturn' },
  { name: 'SEGA CD' },
  { name: 'SEGA 32X' },
  { name: 'SEGA Master System' },
  { name: 'Dreamcast' },
  { name: '3DO' },
  { name: 'Jaguar' },
  { name: 'Game Gear' },
  { name: 'Neo Geo' }
]) 
}
module.exports = {
    getAllGenreAPI,
};