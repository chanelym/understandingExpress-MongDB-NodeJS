const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/cities');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Cities Route'});
});

router.get('/listAll', citiesController.getAll);

router.get('/listName/:name', citiesController.getUnique);

router.post('/add', citiesController.create);

router.put('/update/:id', citiesController.update);

router.delete('/del/:id', citiesController.delete);

module.exports = router;