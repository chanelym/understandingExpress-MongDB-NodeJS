const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/cities');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Cities Route'});
});

router.get('/listall', citiesController.getcities);

router.get('/listname/:name', citiesController.getCityByName);

router.post('/add', citiesController.createCity);

router.put('/update/:id', citiesController.updateCity);

router.delete('/del/:id', citiesController.deleteCityByID);

module.exports = router;