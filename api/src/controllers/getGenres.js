const fetch = require('node-fetch')
const NodeCache = require('node-cache')
const { Genre } = require('../db')
const { API_KEY } = process.env

// Crea una nueva instancia de NodeCache con un tiempo de vida de 1 hora para cachear los géneros.
const cache = new NodeCache({ stdTTL: 3600 })

const getGenres = async () => {
  try {
    // Comprueba si los géneros están en caché.
    const cacheKey = 'genres'
    const cacheData = cache.get(cacheKey)
    if (cacheData) {
      console.log('Datos de géneros obtenidos de la caché')
      return cacheData
    }

    // Si no hay datos de géneros en caché, obtiene los géneros de la base de datos.
    const dbGenres = await Genre.findAll()

    if (!dbGenres.length) {
      // Si la base de datos está vacía, obtiene los géneros de la API y los guarda en la base de datos.
      const res = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const { results } = await res.json()

      if (!results) throw Error('API request error')

      const genres = results.map(({ id, name }) => ({ id, name }))
      await Genre.bulkCreate(genres)

      console.log('Datos de géneros obtenidos de la API')
      // Guarda los datos de géneros en caché.
      cache.set(cacheKey, genres)
      return genres
    }

    console.log('Datos de géneros obtenidos de la base de datos')
    // Si hay datos de géneros en la base de datos, los devuelve.
    const genres = dbGenres.map(({ id, name }) => ({ id, name }))
    // Guarda los datos de géneros en caché.
    cache.set(cacheKey, genres)
    return genres
  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = getGenres