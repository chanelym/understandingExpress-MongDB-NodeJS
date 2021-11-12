const express = require('express');
const router = express.Router();
const statesController = require('../controllers/states');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to States Route'});
});

router.get('/listall', statesController.getstates);

router.get('/listname/:name', statesController.getStateByName);

router.post('/add', statesController.createStats);

router.put('/update/:id', statesController.updateState);

router.delete('/del/:id', statesController.deleteStateByID);

module.exports = router;