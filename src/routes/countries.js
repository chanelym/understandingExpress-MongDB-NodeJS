const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Countries Route'});
});

router.get('/listall', countriesController.getAll);

router.get('/listname/:name', countriesController.getUnique);

router.post('/add', countriesController.create);

router.put('/update/:id', countriesController.update);

router.delete('/del/:id', countriesController.delete);

module.exports = router;