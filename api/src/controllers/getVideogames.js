const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutos de cache
const API_KEY = process.env.API_KEY;

const getVideogames = async () => {
  try {
    const [dbVideogames, apiVideogames] = await Promise.all([
      getDbVideogames(),
      getApiVideogames()
    ]);

    if (![...dbVideogames, ...apiVideogames].length) throw Error('Videogames not found');
    
    return [...dbVideogames, ...apiVideogames];
  } catch (error) {
    throw Error(error.message);
  }
};

const getDbVideogames = async () => {
  try {
    const cachedData = cache.get('dbVideogames');
    if (cachedData) {
      return cachedData;
    } else {
      const videogames = await Videogame.findAll({
        include: Genre,
      });
      const dbVideogames = videogames.map((g) => ({
        id: g.id,
        name: g.name,
        image: g.image,
        rating: g.rating,
        genres: g.genres.map((genre) => genre.name),
      }));
      cache.set('dbVideogames', dbVideogames);
      return dbVideogames;
    }
  } catch (error) {
    throw Error(error.message);
  }
};

const getApiVideogames = async (url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`, videogames = []) => {
  if (videogames.length === 100) return videogames;

  try {
    let auxVideogames;
    let nextPage;
    const cachedData = cache.get(url);
    if (cachedData) {
      auxVideogames = cachedData.results.map((g) => ({
        id: g.id,
        name: g.name,
        image: g.background_image ? g.background_image : 'https://target.scene7.com/is/image/Target/Cat_Nav_VideoGames-201215-1608014929542',
        rating: g.rating_top,
        genres: g.genres ? g.genres.map((genre) => genre.name) : [],
      }));
      nextPage = cachedData.next;
    } else {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.results) throw Error('Invalid API response');
      nextPage = data.next;
      auxVideogames = data.results.map((g) => ({
        id: g.id,
        name: g.name,
        image: g.background_image ? g.background_image : 'https://target.scene7.com/is/image/Target/Cat_Nav_VideoGames-201215-1608014929542',
        rating: g.rating_top,
        genres: g.genres ? g.genres.map((genre) => genre.name) : [],
      }));
      cache.set(url, { results: data.results, next: nextPage });
    }
    videogames = [...videogames, ...auxVideogames];
    return getApiVideogames(nextPage, videogames);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getVideogames;