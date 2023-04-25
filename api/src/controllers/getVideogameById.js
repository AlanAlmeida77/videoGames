const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { validate } = require('uuid');

const getVideogamesById = async (id) => {
  try {
    if (validate(id)) {
      const dbVideogame = await searchOnDb(id);
      if (dbVideogame) return dbVideogame;
      throw Error('Videogame not found');
    } else if (Number(id)) {
      const apiVideogame = await searchOnApi(id);
      if (apiVideogame) return apiVideogame;
      throw Error('Videogame not found');
    } else {
      throw Error('Videogame not found');
    }
  } catch (error) {
    throw Error(error.message);
  }
};

const searchOnApi = async (id) => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  const data = await response.json();
  if (data.detail) {
    throw Error('Videogame not found');
  }
  return {
    id: data.id,
    name: data.name,
    description: data.description_raw,
    platforms: data.platforms.map(r => r.platform.name),
    image: data.background_image || 'https://target.scene7.com/is/image/Target/Cat_Nav_VideoGames-201215-1608014929542',
    released: data.released,
    rating: data.rating_top,
    genres: data.genres.map(genre => genre.name)
  };
};

const searchOnDb = async (id) => {
  const auxVideogame = await Videogame.findByPk(id, {
    include: Genre
  });
  if (!auxVideogame) {
    throw Error('Videogame not found');
  }
  const { id: idDb, name, description, platforms, image, released, rating, genres } = auxVideogame;
  return {
    id,
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres: genres.map(genre => genre.name),
  };
};

module.exports = getVideogamesById;

