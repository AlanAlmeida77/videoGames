const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { validate } = require('uuid');

const getVideogamesById = async (id) => {
  try {
    let videogame;

    if (validate(id)) {
      videogame = await searchOnDb(id);
    } else if (Number(id)) {
      try {
        videogame = await searchOnApi(id);
      } catch (error) {
        // If the API call fails, search on the database
        videogame = await searchOnDb(id);
      }
    }

    if (!videogame) throw new Error('Videogame not found');

    return videogame;
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchOnApi = async (id) => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  const data = await response.json();

  if (data.detail) throw new Error('Videogame not found');

  return {
    id: data.id,
    name: data.name,
    description: data.description_raw,
    platforms: data.platforms.map((platform) => platform.platform.name),
    image: data.background_image || 'https://target.scene7.com/is/image/Target/Cat_Nav_VideoGames-201215-1608014929542',
    released: data.released,
    rating: data.rating_top,
    genres: data.genres.map((genre) => genre.name),
  };
};

const searchOnDb = async (id) => {
  const videogame = await Videogame.findByPk(id, {
    include: Genre,
  });

  if (!videogame) return null;

  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description,
    platforms: videogame.platforms,
    image: videogame.image,
    released: videogame.released,
    rating: videogame.rating,
    genres: videogame.genres.map((genre) => genre.name),
  };
};

module.exports = getVideogamesById;