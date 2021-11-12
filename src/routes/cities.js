const express = require('express');
const router = express.Router();

const CityController = require('../controllers/cities');
const cityController = new CityController;

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Cities Route'});
});

router.get('/listall', cityController.getCities);

router.get('/listname/:name', cityController.getCityByName);

router.post('/add', cityController.createCity);

router.put('/update/:id', cityController.updateCityByID);

router.delete('/del/:id', cityController.deleteCityByID);

module.exports = router;