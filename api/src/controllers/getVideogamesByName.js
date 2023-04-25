const fetch = require('node-fetch');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getVideogamesByName = async (name) => {
  try {
    // Search videogames in the database
    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Genre,
    });

    // If there are results in the database, map them to the expected format
    const formattedDbVideogames = dbVideogames.map((vg) => ({
      id: vg.id,
      name: vg.name,
      image: vg.image,
      rating: vg.rating,
      genres: vg.genres.map((genre) => genre.name),
    }));

    // Search videogames in the API
    const apiResponse = await fetch(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
    );
    const apiData = await apiResponse.json();
    const apiVideogames = apiData.results.map((vg) => ({
      id: vg.id,
      name: vg.name,
      image: vg.background_image || 'https://target.scene7.com/is/image/Target/Cat_Nav_VideoGames-201215-1608014929542',
      rating: vg.rating_top,
      genres: vg.genres.map((genre) => genre.name),
    }));

    // Return the videogames found, combining both sources
    return [...formattedDbVideogames, ...apiVideogames];
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = getVideogamesByName;