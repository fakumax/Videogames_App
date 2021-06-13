const axios = require('axios');
const { Platform } = require('../db');

async function getAllPlatformAPI(req, res, next) {
  try {
    const dbplatform =  await funcPlatform();
    const dbresult = await Platform.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
   return await res.json(dbresult)
  } catch (err) {
    next(err);
  }
}

// --- Values from platform
async function funcPlatform() {
  const platform = [
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
    { name: 'Neo Geo' },
    { name: 'Web' },
  ];
  const results =  platform.map((valor) =>
    Platform.findOrCreate({
      where: {
        name: valor.name,
      },
    })
  );
  return  results;
}
module.exports = {
    getAllPlatformAPI,
};
