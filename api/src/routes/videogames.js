const Router = require('express')
const postVideogame = require('../controllers/postVideogame')
const getVideogames = require('../controllers/getVideogames')
const getVideogamesById = require('../controllers/getVideogameById')
const videogamesRouter = Router()
const getVideogamesByName = require('../controllers/getVideogamesByName')

videogamesRouter.get('/', async (req, res) => {
  const { name, page = 1, limit = 20 } = req.query
  try {
    let arrVideogames
    if (name) {
      arrVideogames = await getVideogamesByName(name)
    } else {
      const offset = (page - 1) * limit
      arrVideogames = await getVideogames(offset, limit)
    }
    res.status(200).json({
      ok: true,
      arrVideogames
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    })
  }
})

videogamesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const videogame = await getVideogamesById(id)
    res.status(200).json({
      ok: true,
      videogame
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    })
  }
})

videogamesRouter.post('/', async (req, res) => {
  const newVideogame = req.body
  try {
    const auxVideogame = await postVideogame(newVideogame)
    const { id, name, image, rating, genres } = await getVideogamesById(auxVideogame.videogame.id)
    res.status(200).json({
      response: auxVideogame.created
        ? {
          ok: true,
          message: 'Videogame created successfully!',
          createdVideogame: { id, name, image, rating, genres }
        }
        : {
          ok: false,
          message: 'Videogame alredy exists'
        }
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    })
  }
})

module.exports = videogamesRouter