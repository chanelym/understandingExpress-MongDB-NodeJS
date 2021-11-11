const express = require('express');
const router = express.Router();
const statesController = require('../controllers/states');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to States Route'});
});

router.get('/listAll', statesController.getAll);

router.get('/listName/:name', statesController.getUnique);

router.post('/add', statesController.create);

router.put('/update/:id', statesController.update);

router.delete('/del/:id', statesController.delete);

module.exports = router;