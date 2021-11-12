const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Countries Route'});
});

router.get('/listall', countriesController.getCountries);

router.get('/listname/:name', countriesController.getCountryByName);

router.post('/add', countriesController.createCountry);

router.put('/update/:id', countriesController.updateCountry);

router.delete('/del/:id', countriesController.deleteCountryByID);

module.exports = router;