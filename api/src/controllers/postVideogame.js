const { Videogame, Genre } = require('../db');

const postVideogame = async (nG) => {
  try {
    const { name, description, platforms, image, released, rating, genres } = nG;

    const videogame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating
    });

    const genresToAdd = await Genre.findAll({ where: { id: genres } }).map(genre => genre.name);
    videogame.addGenres(genresToAdd);

    return { videogame, created: true };
  } catch (error) {
    console.log(error)
    throw Error(error.message);
  }
};

module.exports = {postVideogame};