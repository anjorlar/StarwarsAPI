const { Router } = require('express');
const indexController = require('../controllers/index');
const router = Router()

router.post('/create-comment', indexController.addComment)
router.get('/character-list/:id', indexController.getCharacterList)
router.get('/movie-name', indexController.getMovieName)
router.get('/get-comment', indexController.retrieveComment)

module.exports = router