const express = require('express');
const router = express.Router();
const statesModel = require('../models/states');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to States Route'});
});

router.get('/listAll', async (req, res) => {
    await statesModel.find({}).then((states) => {
        res.status(200).json(states);
    }).catch((err) => {
        res.status(404).json({ message: 'Nothing Found Here' });
        console.error(err);
    });
});

router.get('/listName/:name', async (req, res) => {
    const name = req.params.name;

    await statesModel.findOne({ name: name }).then((states) => {
        if (states == null) { 
            res.status(404).json({ message: 'State Not Found' });
        } else {
            res.status(200).json(states);
        }
        }).catch((err) => {
            res.status(404).json({ message: 'Nothing Found Here' });
    });
});

router.post('/add', async (req,res) => { 

    if (!req.body.name) {
        res.status(400).json({ message: 'Name is Missing' });
        return;
    } else if (!req.body.district) {
        res.status(400).json({ message: 'State Districts Name is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return; 
    } else if (!req.body.minwage) {
        res.status(400).json({ message: 'State Minimum Wage is Missing' });
        return;
    }

    await statesModel.create(req.body).then(() => {
        res.status(200).json({ message: 'State Successfully Created' });
    }).catch((err) => {
        res.status(400).json({ message: 'Oops! Something went Wrong' });
        console.error(err);
    });
});

router.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'URLs ID is Missing' });
        return;
    } else if (!req.body.name) {
        res.status(400).json({ message: 'Name is Missing' });
        return;
    } else if (!req.body.district) {
        res.status(400).json({ message: 'State Districts Name is Missing' });
        return;
    } else if (!req.body.population) {
        res.status(400).json({ message: 'Population Number is Missing' });
        return; 
    } else if (!req.body.minwage) {
        res.status(400).json({ message: 'District Minimum Wage is Missing' });
        return;
    }

    await statesModel.updateOne({ _id:id}, req.body).then(() => { 
        res.status(200).json({ message: 'State Successfully Updated' });
    }).catch((err) => {
        console.error(err);
        res.status(400).json( {message: 'Oops! Something went wrong'});
    });
});

router.delete('/del/:id', async (req,res) => {
    if (req.params.id.length == 24) { 
        await statesModel.deleteOne({_id:req.params.id}).then(() => { 
            res.status(200).json({ message: 'State Successfully Removed!' });
        }).catch((err) => {
            console.error(err);
            res.status(400).json({ message: 'Oops! Something went wrong' });
        });
    } else {
        res.status(400).json({ message: 'ID Needs At Least 24 characters' });
    }
});

module.exports = router;