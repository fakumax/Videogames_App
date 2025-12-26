/* FILTER DB API*/
export const handleFilterDbApi = (orderMe, videogame) => {
    if (orderMe === 'default') return videogame;
    if (Number(orderMe) === 1) {
      /*DB*/
      const list = videogame?.filter((game) => isNaN(game.id));
      return list;
      /* API*/
    } else {
      const list = videogame?.filter((game) => !isNaN(game.id));
      return list;
    }
  };

  /* ORDER BY NAME A-Z Z-A & RATING*/
export const orderByName = (orderMe, videogame) => {
    const array = [...videogame];
    //console.log(videogame);
    if (orderMe === 'default') {
      array.sort((a, b) => {
        let na = a.rating,
          nb = b.rating;
        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      });
      return array;
    }
    //------------
    const arr = [...videogame];
    if (Number(orderMe) === 1) {
      arr.sort((a, b) => {
        let na = a.name.toLowerCase(),
          nb = b.name.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      });
    } else {
      arr.sort((a, b) => {
        let na = a.name.toLowerCase(),
          nb = b.name.toLowerCase();
        if (na < nb) {
          return 1;
        }
        if (na > nb) {
          return -1;
        }
        return 0;
      });
    }
    return arr;
  };


  /* FILTER BY TYPE*/
export const filterByGenre = (gameSelected, videogame) => {
    if (gameSelected === 'default') {
      return videogame;
    }
    let filter = [];
    for (let i = 0; i < videogame.length; i++) {
      const element = videogame[i];
      for (let x = 0; x < element.genres.length; x++) {
        const genres = element.genres[x];
        if (genres.name == gameSelected) {
          filter.push(videogame[i]);
        }
      }
    }
    return filter;
  };