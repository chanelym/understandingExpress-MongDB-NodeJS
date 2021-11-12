const express = require('express');
const router = express.Router();

const StateController = require('../controllers/states');
const stateController = new StateController;

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to States Route'});
});

router.get('/listall', stateController.getStates);

router.get('/listname/:name', stateController.getStateByName);

router.post('/add', stateController.createState);

router.put('/update/:id', stateController.updateStateByID);

router.delete('/del/:id', stateController.deleteStateByID);

module.exports = router;