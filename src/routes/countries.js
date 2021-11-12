const express = require('express');
const router = express.Router();

const CountryController = require('../controllers/countries');
const countryController = new CountryController;

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Countries Route'});
});

router.get('/listall', countryController.getCountries);

router.get('/listname/:name', countryController.getCountryByName);

router.post('/add', countryController.createCountry);

router.put('/update/:id', countryController.updateCountryByID);

router.delete('/del/:id', countryController.deleteCountryByID);

module.exports = router;